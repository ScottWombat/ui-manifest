define([ "application", "marionette" ,'bootstrap','jquery-validate'], function(App, Marionette) {
	var Router = Marionette.AppRouter.extend({
		appRoutes : {
			"login" : "showLogin",
			"forgotPassword":"forgotPassword"
		}
	});

	var API = {
		showLogin : function(model) {
			require([ "layouts/container/content/login/login_controller"], function(loginController) {
				App.startSubApp(null);
				loginController.showLogin(model);
				
			});
		},
		forgotPassword:function(model){
			
			require([ "layouts/container/content/login/login_controller"], function(loginController) {
				App.startSubApp(null);
				loginController.forgotPassword(model);
				
			});
		}
	};
	
	
	   

	App.on("trigger:login", function(model) {
	    
		App.navigate("login");
		API.showLogin(model);
		
	});
	
	/*
	App.on("trigger:forgotPassword", function(model) {
		  
		App.navigate("forgotPassword");
		API.forgotPassword(model);
		
	});
	*/
	App.on("trigger:logout", function(model) {
		model.set({
			loggedIn : false,
			loginMsg : "You are logged off"
		});
		
	});
	

	App.addInitializer(function() {
		new Router({
			controller : API
		});
	});

	return Router;
});