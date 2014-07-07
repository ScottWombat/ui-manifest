define([ "application", "layouts/main-wrapper_controller" ], function(App,Controller) {
	
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