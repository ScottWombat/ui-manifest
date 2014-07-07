define(["application", 
        "layouts/container/content/products/products_view"], 
		function(App, ProductLayout){
	
  App.module("Products", function(Products, App, Backbone, Marionette, $, _){
    Products.Controller = {
    
      showProducts: function(id){
    	 // alert(id);
    	 var view = new ProductLayout.Layout({menuId: id});
    	// App.sliderRegion.close();
    	 App.sliderRegion.show(view);
    	
      },

      setActiveHeader: function(headerUrl){
        var links = App.request("catalogues:entities");
       // var headerToSelect = links.find(function(header){ return header.get("url") === headerUrl; });
   
      }
    };
  });

  return App.Products.Controller;
});
