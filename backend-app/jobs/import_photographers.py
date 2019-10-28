import csv
import json
import http.client
import requests
import sqlalchemy as sql

class CreateUser:
	def __init__(self):
		self.account_creation_url = 'http://dev.aavoni.com:3001/api/users/create'
		self.planner_creation_url = 'http://dev.aavoni.com:3001/api/photographers/create'
		self.marketCity = 'bangalore'
		self.marketCityId = 9
		self.forCity = 'Bangalore'

	# def __init__(self):
	# 	self.account_creation_url = 'https://www.aavoni.com/api/users/create'
	# 	self.planner_creation_url = 'https://www.aavoni.com/api/planners/create'
	# 	self.marketCity = 'bangalore'
	# 	self.marketCityId = 9
	# 	self.forCity = 'Bangalore'

	def create_account(self, row):
		# data to be sent to api 
		data = {'authToken': 'elkdfj2938dfwekjrh2kj3hr423',
				'country': 'IN', 
		        'email': row['email'], 
		        'fname': row['name']} 
		  
		# sending post request and saving response as response object 
		r = requests.post(url = self.account_creation_url, data = data) 
		response = json.loads(r.text)

		return response

	def create_planner(self, row):
		data = {'authToken': 'elkdfj2938dfwekjrh2kj3hr423',
				'userId': row['user_id'],
		        'email': row['email'], 
		        'name': row['name'],
		        'marketCity': self.marketCity,
		        'marketCityId': self.marketCityId,
		        'phone': row['phone'],
		        'address': row['display_address'],
		        'city': self.forCity,
		        'lat': row['latitude'],
		        'lng': row['longitude']} 

		r = requests.post(url = self.planner_creation_url, data = data) 
		response = json.loads(r.text)

		return response

	def create_entity(self, row):
		create_acc_resp = self.create_account(row)
		
		if create_acc_resp['success'] == True:
			print "User created %s:%d" %(row['email'], create_acc_resp['data']['id'])
			row['user_id'] = create_acc_resp['data']['id']
			planner_created_resp = self.create_planner(row)
			print "Planner created %d" %(planner_created_resp['data']['id'])
		else:
			print "Error creating user %s" %(row['email'])

		print "-----------\n"
		return True


if __name__ == "__main__":
	with open('/Users/mdholaria/Downloads/photography_bangalore.json') as f:

		cuObj = CreateUser()

		data = json.loads(f.read())
		for row in data:
			cuObj.create_entity(row)
    
