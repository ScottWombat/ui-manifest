'use strict';

module.exports = {
		 options: {
	            // Bower components folder will be removed afterwards,set to true
	            clean: false
	      },
	      libs: {
	            options: {
	                destPrefix: 'build/wwwroot/js/vendors'
	            },
	            files: {
	            	'backbone/backbone.js' : 'backbone/backbone.js',
	                'backbone.babysitter/backbone.babysitter.js':'backbone.babysitter/lib/backbone.babysitter.js',
	                'backbone.syphon/backbone.syphon.js':'backbone.syphon/lib/backbone.syphon.js',
	                'backbone.wreqr/backbone.wreqr.js' : 'backbone.wreqr/lib/backbone.wreqr.js',
	                'backbone.localStorage/backbone.localStorage.js' : 'backbone.localStorage/backbone.localStorage.js',
	                'bootstrap-validator/validator.js' : 'bootstrap-validator/dist/validator.js',
	                'handlebars/handlebars.js': 'handlebars/handlebars.js',
	                'jquery/jquery.js':'jquery/dist/jquery.js',
	                'jquery-validate/jquery.validate.js':'jquery-validate/dist/jquery.validate.js',
	                'json/json2.js':'json/json2.js',
	                'marionette/backbone.marionette.js' : 'marionette/lib/backbone.marionette.js',
	                'requirejs/require.js': 'requirejs/require.js',
	                'text/text.js': 'text/text.js',
	                'underscore/underscore.js': 'underscore/underscore.js',
	            }
	        },
	        folders:{
	        	files: {
	        		'build/wwwroot/js/vendors/bootstrap/dist': 'bootstrap/dist',
	        		'build/wwwroot/js/vendors/font-awesome':'font-awesome',
	        		'build/wwwroot/js/vendors/jquery-ui':'jquery-ui',
	        		'build/wwwroot/js/vendors/modernizr':'modernizr',
	        	}
	        }
}