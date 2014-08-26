'use strict';
var http = require('http');

var common = require('../env/common')
var config = common.config();


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
    host : 'localhost',
    port : 8080,
    path : '/rs-manifest/user/login',
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

   // console.log(req.body.data.email);
  //  console.log(req.body.data.pwd);
	var reqPost = http.request(optionspost, function(res) {
	    console.log("statusCode: ", res.statusCode);
	    var buffer='';
	    res.on('data', function(d) {
	    	 buffer += d.toString();
	    });
	    res.on('end', function() {
	        console.info('Post result:\n');
	        var ret = JSON.parse(buffer);
	        if(ret.authenticated){
	        	 console.log("User Authenticated:" + ret.token +":"+ret.email);
	        	 console.log(config.facebook_app_id);
	        }else{
	        	console.log("invalid user");
	        	 console.log(config.facebook_app_id);
	        }
	        console.info('\n\nCall completed');
	    });
	});
	// var jsonObject = JSON.stringify({'email':'revit@exemail.com.au','pwd':'pwd'});

	//var jsonObject = JSON.stringify({'email':req.body.data.email,'pwd':req.body.data.pwd});
	var jsonObject = JSON.stringify({'email':'req.body.data.email','pwd':'req.body.data.pwd'});
	// write the json data
	reqPost.write(jsonObject);
	reqPost.end();
	reqPost.on('error', function(e) {
	    console.error(e);
	});
	 
	next();
}


module.exports = {
		getUser: getUser,
		postUser:postUser
	
};