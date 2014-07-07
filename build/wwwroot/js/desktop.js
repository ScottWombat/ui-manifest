requirejs.config({
    baseUrl: 'js',
    paths: {
    	jquery                  : 'libs/jquery/jquery',
    	'jquery-ui'             : 'libs/jquery-ui/jquery-ui',
    	'jquery-validate'	    : 'libs/jquery-validate/jquery.validate',
    	underscore              : 'libs/underscore/underscore', // https://github.com/amdjs
    	backbone                : 'libs/backbone/backbone',// https://github.com/amdjs
    	'backbone.picky'        : "libs/backbone/backbone.picky",
    	'backbone.syphon'       : "libs/backbone.syphon/backbone.syphon",
    	bootstrap				: 'libs/bootstrap/dist/js/bootstrap.min',
    	localstorage            : 'libs/backbone.localStorage/backbone.localStorage',
    	marionette              : 'libs/marionette/backbone.marionette',
    	handlebars              : 'libs/handlebars/handlebars',
    	json                    : 'libs/json/json2',
    	text                    : 'libs/text/text',
    	//i18n					: 'libs/i18n/i18n',
    	//traffiCop               : 'libs/trafficcop/TrafficeCop'
    	//global			        : 'commons/global'
    	
    
    },
    shim: {
        backbone: {
          deps: ['jquery', 'underscore'],
          exports: 'Backbone'
        },
        marionette: {
  	      deps: ['backbone'] ,
  	      exports: 'Backbone.Marionette'
        },
        handlebars:{
            "exports":"Handlebars"
        },
        bootstrap:{
        	 deps: ['jquery'] ,
            exports : "bootstrap"
        },
        "jquery-ui": ["jquery"],
        'jquery-validate' : {
        	deps: ["jquery"]
           
        },
        'trafficCop' : ['trafficCop'],
        global:{
        	deps:['handlebars']
        }
     },
    
    
     deps : ['jquery','jquery-ui','underscore','bootstrap','jquery-validate','marionette']
   
});

//require(['jquery','bootstrap','commons/custom'], function(){});
/*
require(['application','jquery','bootstrap','commons/custom',
       
         'commons/handleBarsHelper',
      
         'layout/main/main_app',
 		 'commons/dom',
 		 'commons/global'], function(Application){
	
	Application.start();		
});
*/


require(['application','jquery','jquery-validate','bootstrap','commons/custom','commons/global',
         'layouts/header/htop/language/language_app',
         'layouts/header/htop/currency/currency_app',
         'layouts/header/htop/links/links_app',
         'layouts/header/htop/links/wishlist/wishlist_app',
         'layouts/header/hsecond/search/search_app',
         'layouts/header/hsecond/cart/cart_app',
         'layouts/header/menu/menu_app',
         //'layouts/container/content/slider/slider_app',
         'layouts/container/content/viewcart/viewcart_app',
         'layouts/container/content/checkout/checkout_app',
         'layouts/container/content/login/login_app',
         'layouts/container/content/signup/signup_app'
         //'layouts/header/hsecond/cart/cart_app'
         ], function(App){
	
	    App.start();		
});







