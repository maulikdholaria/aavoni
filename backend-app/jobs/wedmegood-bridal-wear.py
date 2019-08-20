import urllib2
from lxml import html
import json

ROOT_URL = 'https://www.wedmegood.com/vendors/mumbai/bridal-wear/'
OUTPUT_FILE = 'bridal-wear.json'

totalSearchPagesToBeCrawled = 27;





def parseSearchHTML(htmlBody):
	#sprint htmlBody
	vendorsArray = []
	tree = html.fromstring(htmlBody)
	scripts = tree.xpath('//html/body/script/text()')
	for scriptText in scripts:
		if "window.__INITIAL_STATE__=" in scriptText:
			scriptText = scriptText.replace('window.__INITIAL_STATE__=', '')
			scriptText = scriptText[:-1]
			scriptJson = json.loads(scriptText)
			vendorsArray = scriptJson['vendorList']['vendorsArray']
	
	return vendorsArray


def getAllFetachableVendors(totalSearchPagesToBeCrawled, ROOT_URL):
	url = ROOT_URL
	vendors = []
	for i in range(0,totalSearchPagesToBeCrawled):
		if i > 0:
			url = ROOT_URL + "?page=" + str(i);

		print url
		
		response = urllib2.urlopen(url)
		htmlBody = response.read()
		vendors.extend(parseSearchHTML(htmlBody))

	return vendors

def parseVendorHTML(htmlBody):
	vendorDetail = {}
	tree = html.fromstring(htmlBody)
	scripts = tree.xpath('//html/body/script/text()')
	for scriptText in scripts:
		if "window.__INITIAL_STATE__=" in scriptText:
			scriptText = scriptText.replace('window.__INITIAL_STATE__=', '')
			scriptText = scriptText[:-1]
			scriptJson = json.loads(scriptText)
			vendorDetail = scriptJson['vendorProfile']
	
	return vendorDetail


def getVendorDetails(vendors, outputFile):
	totalVendors = 0
	#allVendors = []
	f = open(outputFile,"w+")
	for vendor in vendors:
		vendorUrl = "https://www.wedmegood.com" + vendor['new_slug']
		print vendorUrl
		try:
			response = urllib2.urlopen(vendorUrl)
			htmlBody = response.read()
			f.write(json.dumps(parseVendorHTML(htmlBody)) + '\n')
			#allVendors.append(parseVendorHTML(htmlBody))
			totalVendors += 1
		except:
  			continue

  	f.close() 
	return totalVendors

vendors = getAllFetachableVendors(totalSearchPagesToBeCrawled, ROOT_URL)
print "Total Vendors: %d" %(len(vendors))
allVendorDetails = getVendorDetails(vendors, OUTPUT_FILE)
print "Total Vendors details: %d" %(allVendorDetails)
#print "Total Vendors details: %d" %(len(allVendorDetails))
#print allVendorDetails

# for vendor in allVendorDetails:
# 	print json.dumps(vendor)
# print len(allVendorDetails)
# print allVendorDetails[0]
# print allVendorDetails[-1]