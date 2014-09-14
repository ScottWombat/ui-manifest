define([ "application", "layouts/header/htop/links/wishlist/wishlist_controller" ], function(App,Controller) {
	
	App.module("WishlistApp", function(Main, App, Backbone,Marionette, $, _) {

		var API = {
			addLayout : function() {
				Controller.addLayout();
			},
			addItem:function(id){
				Controller.addItem(id);
			},
			addItemToCart:function(id){
				
			},
			deleteItem:function(id){
				Controller.deleteItem(id);
			}
		};
		
		App.on("start", function() {
			
		});
		

		App.on("wishitems:addItem", function(id){
			
		     API.addItem(id);
		});
		App.on("wishitems:addItemToCart", function(id){
			
		     API.addItemToCart(id);
		});
		App.on("wishitems:removeItem", function(id){
			  API.deleteItem(id);
		});
	});

	return App.WishlistApp;
});

