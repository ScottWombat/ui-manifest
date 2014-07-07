define([ "application", "layouts/container/content/slider/slider_controller",'commons/custom' ], function(App,Controller) {
	
	App.module("ContainerLayout", function(Main, App, Backbone,Marionette, $, _) {

		var API = {
			layout : function() {
				Controller.addLayout();
			},
			layoutclose:function(){
				Controller.close();
			}
		};

		App.on("start", function() {
			API.layout();
		});
		App.on("slider:close",function(){
			API.layoutclose();
		});
	});

	return App.ContainerLayout;
});