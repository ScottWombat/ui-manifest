define(["application"], function(Mystore){
  Mystore.module("Entities", function(Entities, Mystore, Backbone, Marionette, $, _){
    Entities.Product = Backbone.Model.extend({
        initialize: function(){}
        
    });

    Entities.Products = Backbone.Collection.extend({
      model: Entities.Product,
      url: REST_URL + "products/Mobile Phones?callback=jsonCallback",
     
	  initialize: function(){
	        console.info("Products initialize")
	      
	    },
	    parse: function (response) {
	        return response;
	    }
    });

    var initializeHeaders = function(){
    	Entities.Collection = new Entities.Products();
    	return Entities.Collection;
    };
    
   
    var API = {
      getHeaders: function(){
    	
           Entities.Collection = initializeHeaders();
           Entities.Collection.fetch(
        		   {success:function(){
        			   console.info('fetching products collection from storage');
        		      console.info('collection size:'+Entities.Collection.length)
        		   },
        		   error:function(){
         		      console.info('error populating data');
         		   }
         });     
       
        return Entities.Collection;
      }
    };

    Mystore.reqres.setHandler("products:entities", function(){
      return API.getHeaders();
    });
  });

  return ;
});
