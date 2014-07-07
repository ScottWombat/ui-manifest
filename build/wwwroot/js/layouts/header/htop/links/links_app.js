define([ "application",'layouts/header/htop/links/links_controller'], function(App,Controller) {
	
	App.module("LinksLayout", function(Main, App, Backbone,Marionette, $, _) {

		var API = {
			layout : function() {
				Controller.addLayout();
			}
		};

		App.on("start", function() {
		
			API.layout();
		});
	});

	return App.LinksLayout;
});