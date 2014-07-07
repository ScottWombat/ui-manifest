define([ "application", "layouts/header/htop/links/wishlist/wishlist_controller" ], function(App,Controller) {
	
	App.module("WishlistApp", function(Main, App, Backbone,Marionette, $, _) {

		var API = {
			layout : function() {
				Controller.addLayout();
			},
			addItem:function(id){
				Controller.addItem(id);
			},
			deleteItem:function(id){
				Controller.deleteItem(id);
			}
		};

		App.on("wishlist:addItem", function(id){
		      API.addItem(id);
		});
		App.on("wishlist:deleteItem", function(id){
		   
			API.deleteItem(id);
		});
	});

	return App.WishlistApp;
});

