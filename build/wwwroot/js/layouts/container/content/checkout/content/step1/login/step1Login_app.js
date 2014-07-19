define([ "application", "layouts/container/content/checkout/content/step1/login/step1Login_controller" ], function(App,Step1LoginController) {
	
	App.module("Step1LoginApp", function(Main, App, Backbone,Marionette, $, _) {
       
		var API = {
				
			login:function(){
				Step1LoginController.login();
			}
		};
			
		App.on("step1:login", function() {
			API.login();
		});
	
	});

	return App.Step1LoginApp;
});