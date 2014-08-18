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
    }
  };
  App.on("products:show", function(menuId){
	  
	 // App.navigate("products");
	  API.showProducts(menuId);
  });
  
  App.on("products:list",function(menuId){
	  API.listProducts(menuId);
  });
  
 

  App.addInitializer(function(){
    new Router({
      controller: API
    });
  });

  return Router;
});