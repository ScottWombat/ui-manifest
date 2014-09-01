requirejs.config({
    baseUrl: 'js',
    paths: {
    	jquery                  : 'libs/jquery/jquery-1.9.1',
    	'jquery-ui'             : 'libs/jquery-ui/jquery-ui',
    	'jquery-validate'	    : 'libs/jquery/jquery.validate',
    	underscore              : 'libs/underscore/underscore', // https://github.com/amdjs
    	backbone                : 'libs/backbone/backbone',// https://github.com/amdjs
    	'backbone.picky'        : "libs/backbone/backbone.picky",
    	'backbone.syphon'      : "libs/backbone/backbone.syphon",
    	bootstrap				: 'libs/bootstrap/js/bootstrap.min',
    	'socket.io-client'  	: 'libs/socket.io-client/socket.io',
    	//localstorage            : 'libs/localStorage/backbone.localStorage',
    	'backbone.localStorage' : 'libs/localStorage/backbone.localStorage',
    	marionette              : 'libs/marionette/backbone.marionette',
    	handlebars              : 'libs/handlebars/handlebars-v1.3.0',
    	json                    : 'libs/json/json2',
    	text                    : 'libs/text/text',
    	i18n					: 'libs/i18n/i18n',
    	i18next					: 'libs/i18next/i18next.amd.withJQuery',
    	traffiCop               : 'libs/trafficcop/TrafficeCop',
    	lodash					: 'libs/lodash/lodash',
    	global			        : 'commons/global'
    	
    
    },
    //locale:  'en-us',
    //locale: localStorage.getItem('locale') || 'en-us',
    //i18n: {
    //    locale: 'th'
   // },
   
    shim: {
        backbone: {
          deps: ['jquery', 'underscore'],
          exports: 'Backbone'
        },
        marionette: {
  	      deps: ['backbone'] ,
  	      exports: 'Backbone.Marionette'
        },
        'underscore':{
        	exports: '_'
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
        },
        'socket.io-client': {
        		    exports: 'io'
        },
       
        'backbone.syphon' : {
            exports : 'Backbone.Syphon',
            deps : [ 'backbone' ]
         },
         'backbone.localStorage': {
             deps: ['backbone'],
             exports: 'Backbone.localStorage'
         }
     },
    
    
     deps : ['jquery','jquery-ui','underscore','bootstrap','jquery-validate','backbone.syphon']
   
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


require(['application','i18next','jquery','jquery-validate','bootstrap',
         'commons/custom','commons/global','utils/handlebarsHelpers',
         'layouts/header/htop/language/language_app',
         'layouts/header/htop/currency/currency_app',
         'layouts/header/htop/links/links_app',
        // 'layouts/header/htop/links/wishlist/wishlist_app',
         'layouts/header/hsecond/search/search_app',
         'layouts/header/hsecond/cart/cart_app',
         'layouts/header/menu/menu_app',
         'layouts/container/content/slider/slider_app',
         'layouts/container/content/viewcart/viewcart_app',
         //'layouts/container/content/checkout/checkout_app',
         'layouts/container/content/login/login_app',
         'layouts/container/content/signup/signup_app',
         'layouts/container/content/checkout/steps/steps_app'
         
         //'layouts/container/content/checkout/content/step1/login/step1Login_app'
         //'layouts/header/hsecond/cart/cart_app'
         ], function(App,i18n,$){
	
	      var i18NOptions = {
	    	languages: ["en-US"],
			detectFromHeaders: false,
			lng: window.navigator.userLanguage || window.navigator.language || 'en-US',
			fallbackLang: 'en',
			ns: 'app',
			resGetPath: 'locales/__lng__/__ns__.json',
			useCookie: false
			};
	      
	      $.i18n.init(i18NOptions, function(t) {
	    	  $(document).i18n(); //Once the translations are loaded translate the whole document
	    	});
	      
	     // App.start().then(function () {
	    //	  i18n.init(i18NOptions, function () {
	    		  
	    	//  });
	      //});
	      App.start();		
});







