const fetch = require('node-fetch');
const cheerio = require('cheerio');
var sleep = require('sleep');
var allVerndorProfile = new Array();

var totalSearchPagesToBeCrawled = 27;
var searchPagesCrawledSoFar = -1;
var totalVendorsToBeCrawled = 0;
var vendorsCrawledSoFar = 0;

fetchPlannersSearchPages(totalSearchPagesToBeCrawled)
.then(function(data){
	console.log("Everything crawled");
	console.log(allVerndorProfile.length);
	for(var i=0; i<allVerndorProfile.length; i++) {
		if(allVerndorProfile[i] != undefined)
			console.log(JSON.stringify(allVerndorProfile[i]));
	}
});

function fetchPlannersSearchPages(totalPages) {
	var url = "https://www.wedmegood.com/vendors/mumbai/bridal-makeup/";
    return new Promise(function(resolve, reject){
    	for(var i = 0; i <= totalPages; i++) {
			url = "https://www.wedmegood.com/vendors/mumbai/bridal-makeup/";
			if(i != 0) {
				url += "?page=" + i;
			}

			//console.log("Fetching search page " + url);
			
			fetch(url)
		    	.then(res => res.text())
		    	.then(body => {
		    		var vendors = parseSearchHTML(body);
		    		searchPagesCrawledSoFar += 1;
		    		totalVendorsToBeCrawled += vendors.length;
		    		for(var i=0; i<vendors.length; i++) {
		  				fetchVendorDetail(vendors[i].new_slug).then(function(data){
		  					vendorsCrawledSoFar += 1;
		  					//console.log(totalSearchPagesToBeCrawled + ", " + searchPagesCrawledSoFar + ", " + totalVendorsToBeCrawled + ", " + vendorsCrawledSoFar);
		  					//console.log(data.profile.name);
		  					allVerndorProfile.push(data);
		  					if(searchPagesCrawledSoFar == totalSearchPagesToBeCrawled && vendorsCrawledSoFar == totalVendorsToBeCrawled) {
		  						resolve();
		  					}
		  				});	
					}
					console.log(totalSearchPagesToBeCrawled + ", " + searchPagesCrawledSoFar + ", " + totalVendorsToBeCrawled + ", " + vendorsCrawledSoFar);
		    	});
	    }
    });
}

function parseSearchHTML(htmlBody) {
	const $ = cheerio.load(htmlBody);
	var vendorsArray = new Array();

	$('script').each(function(index, content){
		//console.log(content.children[0]);
		//if(index == 4) {
		if(content.children.length > 0 && content.children[0].data.indexOf("window.__INITIAL_STATE__=") != -1) {
			var initState = content.children[0].data;
			initState = initState.replace("window.__INITIAL_STATE__=", "");
			initState = initState.slice(0, -1)
			initState = JSON.parse(initState);
			vendorsArray = initState.vendorList.vendorsArray;
		}
	});

	return vendorsArray;
	
}    

function fetchVendorDetail(vendorSlug) {
	const vendorUrl = "https://www.wedmegood.com" + vendorSlug;

	//console.log("Fetching vendor profile " + vendorUrl);

	sleep.msleep(1000);
	return new Promise(function(resolve, reject) {
		fetch(vendorUrl)
    		.then(res => res.text())
    		.then(body => {
    						var vendorProfile = parseVendorHTML(vendorUrl, body);
    						resolve(vendorProfile);
    					});
	});
	
}


function parseVendorHTML(vendorUrl, htmlBody) {
	//console.log("Parsing vendor page " + vendorUrl);
	const $ = cheerio.load(htmlBody);
	var vendorProfile = {} ;
	
	$('script').each(function(index, content){
		if(content.children.length > 0 && content.children[0].data.indexOf("window.__INITIAL_STATE__=") != -1) {
			var initState = content.children[0].data;
			initState = initState.replace("window.__INITIAL_STATE__=", "");
			initState = initState.slice(0, -1)
			try {
				initState = JSON.parse(initState);
				vendorProfile = initState.vendorProfile;
			} catch(e) {
				console.log("{}:" + vendorUrl);
			}
		}
	});

	return vendorProfile;

}
