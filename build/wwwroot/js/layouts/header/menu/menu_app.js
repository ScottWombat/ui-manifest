define([ "application",'layouts/header/menu/menu_controller',
         'layouts/container/content/products/products_view'], function(App,Controller,ProductLayout) {
	
	App.module("CatalogueLayout", function(Main, App, Backbone,Marionette, $, _) {
		var Router = Marionette.AppRouter.extend({
			appRoutes : {
				"products" : "showProducts"
			}
		});
		var API = {
			layout : function() {
				Controller.addLayout();
			},
			showProducts: function(id){
				//Controller.showProduct(id);
				alert('showproduct')
			}
		};

		App.on("start", function() {
		
			API.layout();
		});
		/*
		App.on("products:show", function(id) {
			alert('wdddd');
			 //App.sliderRegion.close();
			//API.showProduct(id);
			 var view = new ProductLayout.Layout({menuId: id});
			 App.navigate("products");
				
			 App.sliderRegion.show(view);
		});
		*/
	});

	return App.CatalogueLayout;
});