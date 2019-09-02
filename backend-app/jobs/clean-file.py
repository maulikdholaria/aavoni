import json


filepath = '/Users/mdholaria/Downloads/bridal-makeup.json'
with open(filepath) as fp:
	line = fp.readline()
	while line:
		new_dict = {}
		jsonLine = json.loads(line)

		new_dict['vendorSlug'] = jsonLine['vendorSlug']
		new_dict['profile'] = jsonLine['profile']
		new_dict['videos'] = jsonLine['videos']
		new_dict['albums'] = jsonLine['albums']
		new_dict['pricing'] = jsonLine['pricing']
		if 'photoArray' in jsonLine:
			new_dict['photoArray'] = jsonLine['photoArray']
		if 'address' in jsonLine:
			new_dict['address'] = jsonLine['address']
		if 'activeAddress' in jsonLine:
			new_dict['activeAddress'] = jsonLine['activeAddress']
		if 'album_cities' in jsonLine:
			new_dict['album_cities'] = jsonLine['album_cities']

		print json.dumps(new_dict)
		line = fp.readline()