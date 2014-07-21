define([ "application", "layouts/container/content/checkout/steps/steps_controller" ], function(App,Controller) {
	
	App.module("StepsApp", function(Main, App, Backbone,Marionette, $, _) {
    
		var API = {
			//layout : function() {
			//	Controller.addLayout();
			//},
			//layoutclose:function(){
			//	Controller.close();
			//},
			update:function(){
				Controller.update();
			}
		};

		//App.on("checkout:start",function(){
			//API.layout();
		//});
		
		App.on("steps:update",function(){
			API.update();
		});
				
				
	});

	return App.StepsApp;
});