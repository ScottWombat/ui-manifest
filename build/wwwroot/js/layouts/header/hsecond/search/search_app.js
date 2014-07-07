define([ "application",'layouts/header/hsecond/search/search_controller'], function(App,Controller) {
	
	App.module("SearchLayout", function(Main, App, Backbone,Marionette, $, _) {

		var API = {
			layout : function() {
				Controller.addLayout();
			}
		};

		App.on("start", function() {
		
			API.layout();
		});
	});

	return App.SearchLayout;
});