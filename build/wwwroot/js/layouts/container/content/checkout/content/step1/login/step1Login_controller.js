define(["application",'layouts/container/content/checkout/workflow/workflow'
        ], function(App,WorkFlow){
	
  App.module("Main", function(Main, App, Backbone, Marionette, $, _){
    Main.Controller = {
    		
       login:function(){
    	  var workFlow = new WorkFlow.Controller();
    	  
    	   alert("login" + workFlow.nextStep());
		 
       }
      
    };
  });

  return App.Main.Controller;
});