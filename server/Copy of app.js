var express = require('express');
var port = process.env.PORT || 3001;
var app = express();

var env = process.env.NODE_ENV || 'development';
if ('development' == env) {
	   // configure stuff here
	}


app.use(express.static(__dirname + '/../build/wwwroot'));

app.get('/test', function (request, response, next) {
	  console.log('Sending foods array:');
	  //console.log(foods);
	  return response.json({'d':1});
});

app.listen(port);