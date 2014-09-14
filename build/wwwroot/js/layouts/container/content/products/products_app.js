define(["application", "marionette","layouts/container/content/products/products_controller"], function(App, Marionette,Controller){
  var Router = Marionette.AppRouter.extend({
    appRoutes: {
      "products" : "showProducts"
    }
  });

  var API = {
    showProducts: function(menuId){
        // require(["layouts/container/content/products/products_controller"], function(ProductsController){
    	App.startSubApp(null);
        Controller.showProducts(menuId);
        App.execute("set:active:header", "about");
     // });
    },
    listProducts :function(menuId){
    	 Controller.listProducts(menuId);
    },
    listProductByBrand:function(key){
    	Controller.listProductsByBrand(key);
    },
    searchProduct:function(key){
    	Controller.searchProduct(key);
    }
  };
  App.on("products:show", function(menuId){
	 // App.navigate("products");
	  API.showProducts(menuId);
  });
  
  App.on("products:list",function(menuId){
	  API.listProducts(menuId);
  });
  
  App.on("products:listByBrand",function(key){
	  App.startSubApp(null);
	  API.listProductByBrand(key);
  });
  
  App.on("products:search",function(key){
	  App.startSubApp(null);
	  API.searchProduct(key);
  });
  
  App.addInitializer(function(){
    new Router({
      controller: API
    });
  });

  return Router;
});