//define(["application",'utils/validationManager'], function(App,ValidationManager){
define(["application"], function(App){
  App.module("Entities", function(Entities, App, Backbone, Marionette, $, _){
	  var kinvey_app_key = 'kidxxxx';
	  var kinvey_secret = 'master secret';
	  var authenticatedKinveySync = function(method, model, options) {
		  options.type = "POST";
		 // options.crossDomain = true;
		  //options.dataType='JSONP';
		  options.xhrFields = {withCredentials:true};
		  options.beforeSend = function(jqXHR) {
			  jqXHR.setRequestHeader("accept", "application/json");
			  jqXHR.setRequestHeader("Content-Type","application/json");
			 // jqXHR.setRequestHeader(
			//		  'Authorization',
			//		  'Basic ' + $.base64.encode(
			//				  kinvey_app_key + ':' + kinvey_secret
				//	  )
			  //);
		  }
		  // Call the default Backbone sync implementation
		// if (method === 'OPTIONS') options.type = 'POST';
		  Backbone.sync.call(this, method, model, options);
	  }
	  
	  var posts=[];
	
	  Entities.LoginModel = Backbone.Model.extend({
		    
			initialize: function(options){
			        console.info("Step1 Login Model initialize");
			        this.url = options.url;
			        this.data=JSON.stringify(options.data);
			 },
			 
			// async:false,
			 async: authenticatedKinveySync,
			 parse: function (response) {
				   
			        return response;
			 }
			 /*
			 sync: function(method, model, options) {
			        var that = this;
			        var params = _.extend({
			            type: 'POST',
			            dataType: 'jsonp',
			            url: that.url,
			            processData: true
			        }, options);

			        return $.ajax(params);
			  }
			  */
	  });
	  
	
	  var initializeLogin = function(data){
		 
			 //var url = "/login3";
			 var url = "/login4";
		    // var url = REST_URL + "user/login1?callback=jsonCallback";
		     Entities.Login = new Entities.LoginModel({url:url,data:data});
		    
		 // Entities.Login.set({email:data.email});
		    //Entities.Login.save('pwd',data.pwd);
		    //Entities.Login.set('email',data.email,{validate: true});
		    // Entities.Login.set('pwd',data.pwd);
		  //  Entities.Login.save()
		    
		     return Entities.Login;
	  };
	  
	 
	//  var token='dd';
	  var API = {
			 
		      doLogin: function(data){
		    	
		    	  //var socketEvents= _.extend({}, Backbone.Events);
		    	 // Socket.initialize(socketEvents);
		    	  // console.info(data);
		    	  /*
		    	  var Response = initializeLogin(data);
		    	  
	
		    	  //response.fetch();
		    	  deferred =Response.fetch(
		        		   {success:function(){
		        			 
		        		      console.info('Dologin:');
		        		   },
		        		   error:function(){
		         		      console.info('error populating data');
		         		   }
		           });     
		           $.when(deferred).then(function() {
		        	  // var data =JSON.stringify(Response)
		        	  // var json = JSON.parse(data);
		        	 //  console.info(json.url);
		        	   //alert('heredddd');
		        	 
		           });
		           var data =JSON.stringify(Response)
		           var json = JSON.parse(data);
		           console.info(json.url);
		    	   return "Success";
		    	  */
		    	  var loginModel = initializeLogin(data);
		    	  console.info(data);
		    	  //loginModel.save("{'id:'dd'}");
		    	//  var jsonObject =JSON.stringify(data);
		    	//  console.info(jsonObject);
		    	  
		    	 // loginModel.save();
		    	  /*
		    	  var posts = [];
		    	  var deferred = $.Deferred(); 
		    	  */
		    	  /*
		    	  var d =loginModel.save({}, {
		    		  success: function (model, response,options) {
		    			  var jsonObject =JSON.stringify(response);
	    			      console.info(jsonObject);
		    		        console.info("success" + response.token);
		    		        //deferred.resolve(response);
		    		        //return "dd";
		    		        //posts.push("DD");
		    		        //console.info(posts);
		    		        //self.status="success";
		    		    },
		    		    error: function (model, response) {
		    		    	  var jsonObject =JSON.stringify(response);
		    			      console.info(jsonObject);
		    		          console.info("error" + response.token);
		    		    }
		    	  });
		    	  */
		    
		    	  /*
		    	  var d = loginModel.save({})
		    	          .done(function(response) {
		    	        	  console.info("dd");
		    	        	  console.info(response);
		    	        	  return response;
		    	          })
		    	          .fail(function(response) {
		    	        	  console.log("Error!");
		    	          });
		    	*/
		    	  var d = loginModel.save({});
		    	  var json =JSON.stringify(d);
		    	  console.info(JSON.stringify(json));
		    	
		    	  return "success";
		    	  
		      }
	   };
	  App.reqres.setHandler("checkout:login", function(data){
		
	    	return API.doLogin(data);
	  });
	    
	  
  });
  return ;
});