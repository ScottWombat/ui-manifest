define([ "application", "marionette",'commons/custom' ], function(App, Marionette) {
	var Router = Marionette.AppRouter.extend({
		appRoutes : {
			"signup" : "showSignup",
			
		}
	});

	var API = {
		showSignup : function(model) {
			require([ "layouts/container/content/signup/signup_controller"], function(Controller) {
				App.startSubApp(null);
				//loginController.showLogin(model);
				alert("signup app");
				Controller.showSignup(model);
				
			});
		}
	};
	
	
	   

	App.on("trigger:signup", function(model) {
	    alert(model);
		App.navigate("signup");
		API.showSignup(model);
		
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