define(["application", "marionette"], function(App, Marionette){
  var Router = Marionette.AppRouter.extend({
    appRoutes: {
      "products" : "showProducts"
    }
  });

  var API = {
    showProducts: function(){
      require(["layouts/container/content/products/products_controller"], function(ProductsController){
        App.startSubApp(null);
        ProductsController.showProducts();
        App.execute("set:active:header", "about");
      });
    }
  };

  App.on("products:show", function(){
	  alert('showproducts');
	  App.navigate("products");
	  API.showProducts();
  });

  App.addInitializer(function(){
    new Router({
      controller: API
    });
  });

  return Router;
});