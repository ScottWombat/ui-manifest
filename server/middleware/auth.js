'use strict';
var http = require('http');

//options for GET
var optionsget = {
    host : 'localhost', // here only the domain name
    // (no http/https !)
    port : 8080,
    path : '/RestWebServiceTest/rs/json/students', // the rest of the url with parameters if needed
    method : 'GET' // do GET
};

var jsonObject = JSON.stringify({
    "message" : "The web of things is approaching, let do some tests to be ready!",
    "name" : "Test message posted with node.js",
    "caption" : "Some tests with node.js",
    "link" : "http://www.youscada.com",
    "description" : "this is a description",
    "picture" : "http://youscada.com/wp-content/uploads/2012/05/logo2.png",
    "actions" : [ {
        "name" : "youSCADA",
        "link" : "http://www.youscada.com"
    } ]
});
 

//prepare the header
var postheaders = {
    'Content-Type' : 'application/json',
    'Content-Length' : Buffer.byteLength(jsonObject, 'utf8')
};
 
// the post options
var optionspost = {
    host : 'graph.facebook.com',
    port : 443,
    path : '/youscada/feed?access_token=your_api_key',
    method : 'POST',
    headers : postheaders
};
 


function getUser(req, res, next){
	console.log('SPA boilerplate started: ');
	var reqGet = http.request(optionsget, function(res) {
		
		    res.on('data', function(d) {
		        console.log('GET result:\n');
		        process.stdout.write(d);
		        //console.log(d);
		        console.log('\n\nCall completed');
		    });
		 
		});
		 
		reqGet.end();
		reqGet.on('error', function(e) {
		    console.log(e);
		});
	 
	next();
}

function postUser(req,res,next){
	var reqPost = https.request(optionspost, function(res) {
	    console.log("statusCode: ", res.statusCode);
	    // uncomment it for header details
	//  console.log("headers: ", res.headers);
	 
	    res.on('data', function(d) {
	        console.log('POST result:\n');
	        process.stdout.write(d);
	        console.log('\n\nPOST completed');
	    });
	});
	 
	// write the json data
	reqPost.write(jsonObject);
	reqPost.end();
	reqPost.on('error', function(e) {
	    console.error(e);
	});
	 
	next();
}


module.exports = {
		getUser: getUser
	
};