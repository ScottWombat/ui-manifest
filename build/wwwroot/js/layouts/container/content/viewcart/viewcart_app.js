define([ "application", "layouts/container/content/viewcart/viewcart_controller" ], function(App,Controller) {
	
	App.module("ContainerLayout", function(Main, App, Backbone,Marionette, $, _) {

		var API = {
			layout : function() {
				Controller.addLayout();
			},
			layoutclose:function(){
				Controller.close();
			}
		};

		App.on("viewcart:start",function(){
			API.layout();
		});
	});

	return App.ContainerLayout;
});