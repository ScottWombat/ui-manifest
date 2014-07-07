define([ "application", "layouts/header/hsecond/cart/cart_controller" ], function(App,Controller) {
	
	App.module("Main", function(Main, App, Backbone,Marionette, $, _) {
        Main.Cart = {
        	getView:function(CartView){
        		
        		return API.layout(CartView);
        	}
        };
		var API = {
				
			addLayout:function(){
				Controller.addLayout();
			},
			refreshEntities : function() {
				Controller.refreshEntities();
			},
			addItem:function(id){
				Controller.addItem(id);
			},
			removeItem:function(id){
				Controller.removeItem(id);
			}
		};
		
		App.on("start", function() {
			API.addLayout();
		});
		
		App.on("cart:cart", function() {
			API.refreshEntities();
		});
		App.on("cart:additem", function(id){
		      API.addItem(id);
		});
		App.on("cart:removeItem", function(id){
		      API.removeItem(id);
		});
		
	});

	return App.Main.Cart;
});
