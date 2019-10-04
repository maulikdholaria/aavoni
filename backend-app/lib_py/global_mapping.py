
class GlobalMapping:

	@staticmethod
	def getBudget(country, value):
		us_budget = [{ 'value': 0, 'label': 'Not Sure', 'upperLimit': 20000, 'midLimit': 17500},
					  { 'value': 1, 'label': '$0-$5,000', 'upperLimit': 5000, 'midLimit': 2500},
					  { 'value': 2, 'label': '$5,000-$10,000', 'upperLimit': 10000, 'midLimit': 5000},
					  { 'value': 3, 'label': '$10,000-$15,000', 'upperLimit': 15000, 'midLimit': 12500},
					  { 'value': 4, 'label': '$15,000-$20,000', 'upperLimit': 20000, 'midLimit': 17500},
					  { 'value': 5, 'label': '$20,000-$30,000', 'upperLimit': 30000, 'midLimit': 25000},
					  { 'value': 6, 'label': '$30,000-$40,000', 'upperLimit': 40000, 'midLimit': 35000},
					  { 'value': 7, 'label': '$40,000-$50,000', 'upperLimit': 50000, 'midLimit': 45000},
					  { 'value': 8, 'label': '$50,000-$75,000', 'upperLimit': 75000, 'midLimit': 62500},
					  { 'value': 9, 'label': '$75,000-$100,000', 'upperLimit': 100000, 'midLimit': 87500},
					  { 'value': 10, 'label': '$100,000-$200,000', 'upperLimit': 200000, 'midLimit': 150000},
					  { 'value': 11, 'label': '$200,000+', 'upperLimit': 250000, 'midLimit': 225000}]

		india_budget = [{ 'value': 0, 'label': 'Not Sure', 'upperLimit': 1000000, 'midLimit': 1750000},
						{ 'value': 1, 'label': 'Rs. 0-10 Lakhs', 'upperLimit': 1000000, 'midLimit': 500000},
						{ 'value': 2, 'label': 'Rs. 10-25 Lakhs', 'upperLimit': 2500000, 'midLimit': 1750000},
						{ 'value': 3, 'label': 'Rs. 25-50 Lakhs', 'upperLimit': 5000000, 'midLimit': 3750000},
						{ 'value': 4, 'label': 'Rs. 50 Lakhs - 1 Cr.', 'upperLimit': 10000000, 'midLimit': 7500000},
						{ 'value': 5, 'label': 'Rs. 1 Cr.+', 'upperLimit': 20000000, 'midLimit': 10000000}]

		if(country.lower() == 'us'):
			return  us_budget[value]
		elif(country.lower() == 'in'):
			return  india_budget[value]

	@staticmethod
	def getGuests(value):
		guests = [{ 'value': 0, 'label': 'Not Sure' },
				{ 'value': 1, 'label': '0-50' },
				{ 'value': 2, 'label': '51-100' },
				{ 'value': 3, 'label': '100-150' },
				{ 'value': 4, 'label': '151-200' },
				{ 'value': 5, 'label': '200+' }]

		return guests[value]
