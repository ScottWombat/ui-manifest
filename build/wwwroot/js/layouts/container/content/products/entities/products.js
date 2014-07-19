define(["application"], function(Mystore){
  Mystore.module("Entities", function(Entities, Mystore, Backbone, Marionette, $, _){
    Entities.Product = Backbone.Model.extend({
        initialize: function(){}
        
    });

    Entities.Products = Backbone.Collection.extend({
      model: Entities.Product,
      url:'',
     // url: REST_URL + "products/Mobile Phones?callback=jsonCallback",
     
	  initialize: function(options){
	        console.info("Products initialize" + options.menuId);
	        this.url = REST_URL + "product/list/" + options.menuId + "?callback=jsonCallback";
	      
	    },
	    parse: function (response) {
	        return response;
	    }
    });

    var initializeHeaders = function(menuId){
    	Entities.Collection = new Entities.Products({menuId:menuId});
    	return Entities.Collection;
    };
    
   
    var API = {
      getHeaders: function(menuId){
    	 
           Entities.Collection = initializeHeaders(menuId);
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

    Mystore.reqres.setHandler("products:entities", function(menuId){
      return API.getHeaders(menuId);
    });
  });

  return ;
});
