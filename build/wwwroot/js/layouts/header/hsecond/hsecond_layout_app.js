define([ "application", "layout/hsecond/hsecond_layout_controller" ], function(Mystore,LayoutController) {
	
	Mystore.module("Layout", function(Main, Mystore, Backbone,
			Marionette, $, _) {

		var API = {
			layout : function() {
				LayoutController.insertLayout();
			}
		};

	

		Main.on("start", function() {
			
			API.layout();
		});
	});

	return Mystore.Layout;
});