define(["application", 
        "layouts/container/content/products/products_view"], 
		function(App, ProductLayout){
	
  App.module("Products", function(Products, App, Backbone, Marionette, $, _){
    Products.Controller = {
    
      showProducts: function(menuId){
    	 //var productCollection = App.request("products:entities",menuId);   
    	// this.view = new ProductLayout.Layout({products:productCollection,menuId:menuId});
    	  this.view = new ProductLayout.Layout({menuId:menuId});
    	 App.sliderRegion.close();
    	 App.maincontentRegion.show(this.view);
    	
      },
      listProducts:function(menuId){
    	  var productCollection =App.trigger("products:entities",'Mobile Phones',2,5);
    	 // App.maincontentRegion.close();
    	  $.when(productCollection).done(function(cCollection) {
				//var cartview = new CartView.Carts({
				//	collection : cartCollection
				//});
				//App.cartRegion.show(cartview);
    		  App.productRegion.close();
			})

      },
    
      setActiveHeader: function(headerUrl){
        var links = App.request("catalogues:entities",id);
       // var headerToSelect = links.find(function(header){ return header.get("url") === headerUrl; });
   
      }
    };
  });

  return App.Products.Controller;
});
