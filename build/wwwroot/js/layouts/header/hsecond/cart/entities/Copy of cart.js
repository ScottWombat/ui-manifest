define(["application"], function(App){
  App.module("Entities", function(Entities, App, Backbone, Marionette, $, _){
	
	Entities.Model = Backbone.Model.extend({
		 
	
		 url: REST_URL + "cart?callback=jsonCallback",
	     
		initialize: function(){
		        console.info("Cart initialize")
		      
		 },
		 parse: function (response) {
		        return response;
		 }
		
	});
	Entities.UpdateModel = Backbone.Model.extend({
		 
		
		// url: REST_URL + "cart?callback=jsonCallback",
	     
		initialize: function(options){
		        console.info("Cart initialize" + options.id);
		        this.url= REST_URL + "addCartItem/" + options.id +"?callback=jsonCallback";
		      
		 },
		 parse: function (response) {
		        return response;
		 }
		
	});
    /*
    Entities.Cart = Backbone.Collection.extend({
      model: Entities.Model,
      url: REST_URL + "cart?callback=jsonCallback",
     
	  initialize: function(){
	        console.info("Cart initialize")
	      
	    },
	    parse: function (response) {
	        return response;
	    }
    });
    */
    var initializeCart = function(){
    	Entities.Model = new Entities.Model();
    	return Entities.Model;
    };
    var initializeUpdateCart = function(id){
    	Entities.Model = new Entities.UpdateModel({id:id});
    	return Entities.Model;
    };
    
   
    var API = {
      getCart: function(){
           Entities.Model = initializeCart();
           Entities.Model.fetch(
        		   {success:function(){
        			   console.info('fetching cart collection from locale storage');
        		      //console.info('collection size:'+Entities.Collection.length)
        		   },
        		   error:function(){
         		      console.info('error populating data');
         		   }
         });     
       
        return Entities.Model;
      },
      getUpdateCart: function(id){
          Entities.Model = initializeUpdateCart(id);
          Entities.Model.fetch(
       		   {success:function(){
       			   console.info('fetching udate cart collection from locale storage');
       		      //console.info('collection size:'+Entities.Collection.length)
       		   },
       		   error:function(){
        		      console.info('error populating data');
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
  });

  return ;
});
