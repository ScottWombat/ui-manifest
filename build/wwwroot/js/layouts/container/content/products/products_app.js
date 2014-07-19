define(["application", "marionette"], function(App, Marionette){
  var Router = Marionette.AppRouter.extend({
    appRoutes: {
      "products" : "showProducts"
    }
  });

  var API = {
    showProducts: function(menuId){
     
      require(["layouts/container/content/products/products_controller"], function(ProductsController){
       
    	App.startSubApp(null);
        ProductsController.showProducts(menuId);
        App.execute("set:active:header", "about");
      });
    }
  };
  App.on("products:show", function(menuId){
	  
	  App.navigate("products");
	  API.showProducts(menuId);
  });
  
 

  App.addInitializer(function(){
    new Router({
      controller: API
    });
  });

  return Router;
});