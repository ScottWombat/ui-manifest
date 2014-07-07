define(["application",'layouts/header/hsecond/cart/cart_view',
        'layouts/header/hsecond/cart/entities/cart'
        ], function(App, CartView){
	
  App.module("Main", function(Main, App, Backbone, Marionette, $, _){
    Main.Controller = {
    		
       addLayout:function(){
    	   var cartCollection = App.request("cart:entities");
    	   $.when(cartCollection).done(function(cCollection){
    		   var cartview = new CartView.Carts({collection:cartCollection});
        	   App.cartRegion.show(cartview);
    	   })
		 
       },
       refreshEntities:function(){
    	   var refreshCollection = App.request("cart:entities");
    	   $.when(refreshCollection).done(function(refreshCollection){
    		   var cartview1 = new CartView.Carts({collection:refreshCollection});
    		   //cartView1.collection.reset();
        	   App.cartRegion.show(cartview1);
    	   })
		 
       },
      removeItem:function(id){
    	  var newCollection = App.request("cart:entities:removeitem",id);
    	  this.view.collection.fetch();
      },
      addItem:function(id){
    	 
    	 var newCollection = App.request("cart:entities:update",id);
    	 //var newCollection1 = App.request("cart:entities");
    	 $.when(newCollection).done(function(cartCollection){
       	  		//var cartView = new CartView.Carts({collection:newCollection});
    		 var cartView = new CartView.Carts({collection:cartCollection});
       	  	    App.cartRegion.show(cartView);
         });
    	
      }
    };
  });

  return App.Main.Controller;
});