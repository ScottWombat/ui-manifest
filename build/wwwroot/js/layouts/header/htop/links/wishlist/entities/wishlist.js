define(["application"], function(App){
  App.module("Entities", function(Entities, App, Backbone, Marionette, $, _){
	
	Entities.WishItem = Backbone.Model.extend({
    	 defaults : {
    		 id		:'',
             name   : '',
             price  : ''
     
        },	
        initialize: function(){}
        
    });

    Entities.WishItems = Backbone.Collection.extend({
      model: Entities.WishItem,
      url: REST_URL + "wishList?callback=jsonCallback",
     
	  initialize: function(){
	        console.info("WishItems initialize")
	      
	    },
	    parse: function (response) {
	        return response;
	    }
    });

    var initializeHeaders = function(){
    	Entities.Collection = new Entities.WishItems();
    	return Entities.Collection;
    };
    
   
    var API = {
      getHeaders: function(){
    	
           Entities.Collection = initializeHeaders();
           Entities.Collection.fetch(
        		   {success:function(){
        			   console.info('fetching wishitems collection from locale storage');
        		      console.info('collection size:'+Entities.Collection.length)
        		   },
        		   error:function(){
         		      console.info('error populating data');
         		   }
         });     
       
        return Entities.Collection;
      }
    };

    App.reqres.setHandler("wishitems:entities", function(){
      return API.getHeaders();
    });
  });

  return ;
});
