define([ "application", "layouts/container/content/slider/slider_controller",'commons/custom' ], function(App,Controller) {
	
	App.module("ContainerLayout", function(Main, App, Backbone,Marionette, $, _) {

		var API = {
			layout : function() {
				Controller.addLayout();
			}
		};

		App.on("start", function() {
			API.layout();
		});
		
	});

	return App.ContainerLayout;
});