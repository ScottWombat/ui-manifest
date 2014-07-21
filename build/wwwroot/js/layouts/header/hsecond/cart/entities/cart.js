define(["application"], function(App){
  App.module("Entities", function(Entities, App, Backbone, Marionette, $, _){
	
	Entities.Cart = Backbone.Model.extend({
		initialize: function(){
		        console.info("Cart initialize");
		 },
		 parse: function (response) {
		        return response;
		 }
		
	});
	
	Entities.Carts = Backbone.Collection.extend({
	      model: Entities.Cart,
	     // url: REST_URL + "cart/list?callback=jsonCallback",
		  initialize: function(options){
		        console.info("Carts initialize");
		        this.url = options.url;
		  },
		  parse: function (response) {
		        return response;
		   }
	});
	
	 
	Entities.UpdateModel = Backbone.Collection.extend({
		model: Entities.Cart,
		initialize: function(options){
		        console.info("Update model" + options.id);
		       // this.url= REST_URL + "cart/add/item/" + options.id +"?callback=jsonCallback";
		        this.url = options.url;
		 },
		 parse: function (response) {
		        return response;
		 }
		
	});
	
	 var initializeCart = function(){
		 var url = REST_URL + "cart/list?callback=jsonCallback";
	     Entities.Collection = new Entities.Carts({url:url});
	     return Entities.Collection;
	 };
	 
	 var initializeUpdateCart = function(id){
		
		 var url= REST_URL + "cart/add/item/" + id +"?callback=jsonCallback";
	     Entities.Collection = new Entities.UpdateModel({url:url});
	     return Entities.Collection;
	 };
	    
	 var initializeRemoveCartItem = function(id){
		 var url= REST_URL + "cart/remove/item/" + options.id +"?callback=jsonCallback";
	     Entities.Collection = new Entities.RemoveModel({url:url});
	     return Entities.Collection;
	 };
	   
		/*
	Entities.UpdateModel = Backbone.Collection.extend({
		model: Entities.Cart,
		initialize: function(options){
		        console.info("Update model" + options.id);
		        this.url= REST_URL + "cart/add/item/" + options.id +"?callback=jsonCallback";
		 },
		 parse: function (response) {
		        return response;
		 }
		
	});

	Entities.UpdateModel_old = Backbone.Model.extend({
		initialize: function(options){
		        console.info("Cart initialize" + options.id);
		        this.url= REST_URL + "cart/add/item/" + options.id +"?callback=jsonCallback";
		 },
		 parse: function (response) {
		        return response;
		 }
		
	});
	Entities.RemoveModel = Backbone.Model.extend({
		initialize: function(options){
		        //console.info("Cart initialize" + options.id);
		        this.url= REST_URL + "cart/remove/item/" + options.id +"?callback=jsonCallback";
		 },
		 parse: function (response) {
		        return response;
		 }
		
	});
   */
   
    
   
    
   
    var API = {
      getCart: function(){
           Entities.Model = initializeCart();
           deferred =Entities.Model.fetch(
        		   {success:function(){
        			   console.info('fetching cart collection from locale storage');
        		      //console.info('collection size:'+Entities.Collection.length)
        		   },
        		   error:function(){
         		      console.info('error populating data');
         		   }
           });     
           $.when(deferred).then(function() {
        	   //alert('here');
        	 
           });
           return Entities.Model;
      },
      getUpdateCart: function(id){
          Entities.Model = initializeUpdateCart(id);
          Entities.Model.fetch(
       		   {success:function(){
       			   console.info('fetching udate cart collection from locale storage');
       		     
       		   },
       		   error:function(){
        		      console.info('error populating data');
        		   }
        });     
      
       return Entities.Model;
      },
      removeItem:function(id){
    	  Entities.Model = initializeRemoveCartItem(id);
          Entities.Model.fetch(
       		   {success:function(){
       			   console.info('delete cart collection from locale storage');
       		     
       		   },
       		   error:function(){
        		      console.info('error removing data');
        	}
        });     
      
       return Entities.Model;
      }
    };

    App.reqres.setHandler("cart:entities", function(){
    	return API.getCart();
    });
    
    App.reqres.setHandler("cart:entities:update", function(id){
    	
        return API.getUpdateCart(id);
    });
    
    App.reqres.setHandler("cart:entities:removeitem", function(id){
    	
        return API.removeItem(id);
    });
    
  });

  return ;
});
