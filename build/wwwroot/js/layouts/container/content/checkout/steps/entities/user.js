define(["application",'utils/validationManager'], function(App,ValidationManager){
  App.module("Entities", function(Entities, App, Backbone,My){
	  Entities.LoginModel = Backbone.Model.extend({
		
			initialize: function(options){
			        console.info("Step1 Login Model initialize");
			        this.url = options.url;
			        this.data = options.data;
			        
			 },
			
			 parse: function (response) {
			        return response;
			 }
	  });
	  
	
	  var initializeLogin = function(data,errors){
		 
			 var url = REST_URL + "cart/list?callback=jsonCallback";
		     Entities.Login = new Entities.LoginModel({url:url});
		    
		    // Entities.Login.save('email',data.email,{validate: true});
		    // Entities.Login.save('pwd',data.pwd,{validate: true});
		    //Entities.Login.set('email',data.email,{validate: true});
		    // Entities.Login.set('pwd',data.pwd);
		    // Entities.Login.save(data)
		    
		     return Entities.Login;
	  };
	  var API = {
		      doLogin: function(data,erros){
		    	 // console.info(data);
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
		    	 
		      }
	   };
	  App.reqres.setHandler("checkout:login", function(data){
		
	    	return API.doLogin(data);
	  });
	    
	  
  });
  return ;
});