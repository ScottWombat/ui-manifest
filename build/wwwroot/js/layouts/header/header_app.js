define([ "application", "layouts/header/header_controller" ], function(App,Controller) {
	
	App.module("HeaderLayout", function(Main, App, Backbone,Marionette, $, _) {

		var API = {
			layout : function() {
				Controller.addLayout();
			}
		};

		App.on("start", function() {
			API.layout();
		});
	});

	return App.HeaderLayout;
});