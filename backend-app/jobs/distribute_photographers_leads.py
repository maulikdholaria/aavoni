import os
import sys
import json
import random
import uuid
import time
import pandas as pd
import numpy as np
import sqlalchemy as sql
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
sys.path.insert(0, '../lib_py')
from global_mapping import GlobalMapping

class DistributeLeads:
	def __init__(self, env):
		self.env = env
		self.non_production_email = 'rohit@aavoni.com'
		self.non_production_phone = '+19494124179'
		self.max_lead_match = 100
		self.has_questions_to_process = False
		self.config = self.get_config()
		self.sql_conn = self.get_mysql_conn()
		self.last_matched_search_question_id = self.get_last_matched_search_question_id()
		self.latest_search_question = self.get_latest_search_question()
		if self.latest_search_question.empty == False:
			self.market_cities = self.get_market_cities()
			self.photographers = self.get_photographers()
			self.latest_search_question_with_mc = self.determine_search_question_market_city()
			self.photographer_leads = self.derieve_photographer_leads()		
			if self.photographer_leads.empty == False:
				self.has_questions_to_process = True

	def get_config(self):
		env = self.env
		dirname = os.path.dirname(__file__)
		config_filename = os.path.join(dirname, '../config.json')
		with open(config_filename, 'r') as f:
			config_data = f.read()
			config_data = json.loads(config_data)
			return config_data[env]

		return None

	def get_mysql_conn(self):
		config = self.config
		connect_string = 'mysql://%s:%s@%s/%s' %(config['mysql']['user'], config['mysql']['password'], config['mysql']['host'], config['mysql']['database'])
		print connect_string
		sql_engine = sql.create_engine(connect_string)
		return sql_engine

	def mask_email(self, email):
		splitted_email = email.split("@")
		return splitted_email[0][0:3] + "".join(['*'] * 4) + "@" + splitted_email[1]

	def mask_phone(self, phone):
		return phone[0:5] + "*****"

	def get_market_cities(self):
		print "%s(): Getting market cities" %(sys._getframe(  ).f_code.co_name)
		sql = "SELECT * FROM market_cities"
		df = pd.read_sql_query(sql, self.sql_conn)
		df.rename(columns={"id": "marketCity_id"}, inplace=True)	
		return df

	def get_last_matched_search_question_id(self):
		print "%s(): Getting last matched lead" %(sys._getframe(  ).f_code.co_name)
		sql = "SELECT max(searchQuestionId) AS last_search_question_id FROM photographers_search_lead_match"
		df = pd.read_sql_query(sql, self.sql_conn)
		last_search_question_id = 0 if df.last_search_question_id[0] is None else df['last_search_question_id'][0];
		return last_search_question_id


	def get_latest_search_question(self):
		print "%s(): Getting lastest search questions" %(sys._getframe(  ).f_code.co_name)
		sql = """select sq.*
				from search_questions sq
				left join (select searchquestionId from photographers_search_lead_match group by 1) ph on sq.id = ph.searchquestionId
				where ph.searchquestionId is null
				and sq.markedAsBad = 0
				and sq.photographer = 1"""
		df = pd.read_sql_query(sql, self.sql_conn)	
		df.rename(columns={"id": "question_id", "email": "clientEmail", "phone": "clientPhone"}, inplace=True)
		return df

	def determine_search_question_market_city(self):
		print "%s(): Deriving lastest_search_question <-> market_cities" %(sys._getframe(  ).f_code.co_name)
		mc_df = self.market_cities
		sq_df = self.latest_search_question
		mc_df['dummy_key'] = 0
		sq_df['dummy_key'] = 0
		
		merged_df = pd.merge(sq_df, mc_df, how='left', on=['dummy_key'])	
		merged_df['distance'] = merged_df.apply(self.haversine, axis=1)
		merged_df = merged_df.loc[merged_df['distance'] <= 50]
	
		#merged_df.rename(columns={"id_x": "question_id", "id_y": "marketcity_id"}, inplace=True
		return merged_df

	def get_photographers(self):
		print "%s(): Getting photographers" %(sys._getframe(  ).f_code.co_name)
		sql = """SELECT id AS photographer_id, name, marketCity, phone, email,
	   					CASE
							WHEN email != '' AND phone != '' THEN 'both'
							WHEN email != '' THEN 'email'
							WHEN phone != '' THEN 'phone'
        					END AS availableDeliveryMethod
				FROM photographers WHERE email != '' OR phone != ''"""
		df = pd.read_sql_query(sql, self.sql_conn)	
		return df

	def derieve_photographer_leads(self):
		print "%s(): Deriving photographer leads latest_search_question_with_mc <-> photographers" %(sys._getframe(  ).f_code.co_name)
		
		#print self.latest_search_question_with_mc
		
		photographers_by_city = {}
		for index, row in self.photographers.iterrows():
			if row['marketCity'] in photographers_by_city:
				photographers_by_city[row['marketCity']].append(row.to_dict())
			else:
				photographers_by_city[row['marketCity']] = []
				photographers_by_city[row['marketCity']].append(row.to_dict())

		
		matched_photographers = []
		for question_index, row in self.latest_search_question_with_mc.iterrows(): 
			if row['marketCitySlug'] in photographers_by_city:
				photographer_city_length = len(photographers_by_city[row['marketCitySlug']])
				matched_indexes = random.sample(range(0, photographer_city_length), min(photographer_city_length, photographer_city_length))
				for matched_idx in matched_indexes:
					# if self.env == 'production':
					# 	time.sleep(0.5)
					matched_photographer = photographers_by_city[row['marketCitySlug']][matched_idx]
					matched_photographer['question_id'] = row['question_id']
					matched_photographer['uuid'] = str(uuid.uuid1())
					matched_photographers.append(matched_photographer)
		
		matched_photographers_df = pd.DataFrame(matched_photographers)

		#print matched_photographers_df
		
		if matched_photographers_df.empty == True:
			return pd.DataFrame()
		else:
			matched_leads_df = pd.merge(self.latest_search_question_with_mc, matched_photographers_df, how='inner', on=['question_id'])

		return matched_leads_df

	def send_photographer_leads(self):
		print "%s(): Sending photographer leads" %(sys._getframe(  ).f_code.co_name)
		if self.has_questions_to_process == False:
			print "All caught up"
			return
		
		if self.env == 'production':
			leads_to_be_sent_df = self.photographer_leads
		else:
			leads_to_be_sent_df = self.photographer_leads.sample(3)
			leads_to_be_sent_df['email'] = self.non_production_email
			leads_to_be_sent_df['phone'] = self.non_production_phone
		
		for lead_index, lead in leads_to_be_sent_df.iterrows():
			email_status = self.send_photographer_email(lead)
			if email_status == True:
				self.save_photographer_lead_send(lead)
			print "Email | QuestionId: %d | photographerId: %d | %s | %s" %(lead['question_id'], lead['photographer_id'], lead['email'], str(email_status))

	def send_photographer_email(self, lead):
		email_body = self.photographers_email_body(lead)

		message = Mail(from_email='leads@aavoni.com',
	    			   to_emails=lead['email'],
					   subject="%s needs your photography expertise" %(lead['fname']),
	    			   html_content=email_body)
		try:
		    sg = SendGridAPIClient(self.config['SENDGRID_API_KEY'])
		    response = sg.send(message)
		    if response.status_code == 202:
		    	return True
		    else:
		    	return False
		except Exception as e:
		    print(str(e))
		    return False

	def save_photographer_lead_send(self, lead):
		sql_insert_statement = """INSERT INTO 
								  photographers_search_lead_match (searchQuestionId, photographerId, uuid) 
							   	  VALUES(%d, %d, '%s')""" %(lead['question_id'],lead['photographer_id'],lead['uuid'])
		rs = self.sql_conn.execute(sql_insert_statement)
		return True

	def photographers_email_body(self, lead):
		lead['purchase_url'] = "https://www.aavoni.com/photographer-lead-purchase/%s" %(lead['uuid'])
		email_body = """
			Hello %s, 
			<br/><br/>
			You expertise can help %s capture wedding memories.
			<br/><br/>
			Here is the wedding information:
			<br/><br/>
			Name: %s %s
			<br/><br/>
			Wedding Location: %s
			<br/><br/>
			Wedding Date: %s
			<br/><br/>
			Est. Guest: %s
			<br/><br/>
			Est. Wedding Budget: %s
			<br/><br/>
			Email: %s
			<br/><br/>
			Phone: %s
			<br/><br/>
			Message: %s
			<br/><br/>
			<a href="%s">View Contact Info</a>
			<br/><br/>
			Thanks,<br/>
			Team Aaavoni
		""" %(lead['name'], lead['fname'], lead['fname'], lead['lname'], lead['city'], lead['date'], GlobalMapping.getGuests(lead['guests'])['label'], GlobalMapping.getBudget(lead['forCountry'], lead['budget'])['label'], self.mask_email(lead['clientEmail']), self.mask_phone(lead['clientPhone']), lead['message'], lead['purchase_url'])			

		return email_body

	def haversine(self, row):
	    """
	    slightly modified version: of http://stackoverflow.com/a/29546836/2901002

	    Calculate the great circle distance between two points
	    on the earth (specified in decimal degrees or in radians)

	    All (lat, lon) coordinates must have numeric dtypes and be of equal length.

	    """
	    #print row
	    lat1 = row['lat_x']
	    lon1 = row['lng_x']
	    lat2 = row['lat_y']
	    lon2 = row['lng_y']
	    to_radians=True
	    #earth_radius=6371
	    earth_radius = 3958.8

	    if to_radians:
	        lat1, lon1, lat2, lon2 = np.radians([lat1, lon1, lat2, lon2])

	    a = np.sin((lat2-lat1)/2.0)**2 + np.cos(lat1) * np.cos(lat2) * np.sin((lon2-lon1)/2.0)**2

	    return earth_radius * 2 * np.arcsin(np.sqrt(a))




if __name__ == "__main__":

	NODE_ENV = os.environ["NODE_ENV"]
	print("Executing in %s " %(NODE_ENV))
	print("Starttime in %s " %(NODE_ENV))


	dlObj = DistributeLeads(NODE_ENV)	
	dlObj.send_photographer_leads()	




