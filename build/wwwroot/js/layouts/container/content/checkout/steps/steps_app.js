define([ "application", "layouts/container/content/checkout/steps/steps_controller" ], function(App,Controller) {
	
	App.module("ContainerLayout", function(Main, App, Backbone,Marionette, $, _) {

		var API = {
			doLogin : function(data) {
				 var col = Controller.doLogin(data);
				 return col;
			}
		};

		App.on("checkout:step1",function(data){
	
			return 'ddd';// API.doLogin(data);
		});
	});

	return App.ContainerLayout;
});