define(["application", 
        "layouts/container/content/products/products_view"], 
		function(App, ProductLayout){
	
  App.module("Products", function(Products, App, Backbone, Marionette, $, _){
    Products.Controller = {
    
      showProducts: function(menuId){
    	 var productCollection = App.request("products:entities",menuId);   
    	 this.view = new ProductLayout.Layout({products:productCollection});
    //	 App.MainContentRegion.MainCo.close() ;
    	 App.sliderRegion.close();
    	 App.maincontentRegion.show(this.view);
    	
      },
    
      setActiveHeader: function(headerUrl){
        var links = App.request("catalogues:entities",id);
       // var headerToSelect = links.find(function(header){ return header.get("url") === headerUrl; });
   
      }
    };
  });

  return App.Products.Controller;
});
