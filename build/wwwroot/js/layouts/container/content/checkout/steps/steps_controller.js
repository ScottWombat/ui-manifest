define(["application", 
        "layouts/container/content/checkout/steps/steps_layout",
        'layouts/container/content/checkout/steps/entities/user'
        ], function(App,Layout,User){
	
  App.module("Container", function(Container, App, Backbone, Marionette, $, _){
    Container.Controller = {
       doLogin: function(data){
    	//  console.info(data);
    	  var cart = App.request("checkout:login",data);
    	 
    	 return cart;
      }
      
    };
  });

  return App.Container.Controller;
});