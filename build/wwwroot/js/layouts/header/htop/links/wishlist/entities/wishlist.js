define(["application"], function(App){
  App.module("Entities", function(Entities, App, Backbone, Marionette, $, _){
	
	Entities.WishItem = Backbone.Model.extend({
		initialize: function(){
	        console.info("WishItem initialize");
		},
		parse: function (response) {
	        return response;
		}
        
    });
	

    Entities.WishItems = Backbone.Collection.extend({
      model: Entities.WishItem,
    //  url: REST_URL + "wishlist/list?callback=jsonCallback",
     
	  initialize: function(options){
	        console.info("WishItems initialize")
	        this.url = options.url;
	      
	    },
	    parse: function (response) {
	        return response;
	    }
    });
  
    var initializeWishlist = function(){
    	var url = REST_URL + "wishlist/list?callback=jsonCallback";
    	Entities.Collection = new Entities.WishItems({url:url});
    	return Entities.Collection;
    };
    
    var initializeUpdateWishlist = function(id){
    	//alert("initUpdate" + id);
    	//Entities.Collection = new Entities.UpdateModel({id:id});
    	var url = REST_URL + "wishlist/add/" + id +"?callback=jsonCallback";
    
    	Entities.Collection = new Entities.WishItems({url:url});
    	console.info(Entities.Collection);
    	return Entities.Collection;
    };
    
    var initializeRemoveWishlist = function(id){
    	var url = REST_URL + "wishlist/remove/" + id +"?callback=jsonCallback";
    	Entities.Collection = new Entities.WishItems({url:url});
    	console.info(Entities.Collection);
    	return Entities.Collection;
    }
    
   
    var API = {
      getWishlist: function(){
           Entities.Collection = initializeWishlist();
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
      },
      getUpdateWishlist:function(id){
    	   Entities.Collection = initializeUpdateWishlist(id);
    	  
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
      },
      getRemoveWishlist:function(id){
   	   	Entities.Collection = initializeRemoveWishlist(id);
   	  
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
      return API.getWishlist();
    });
    
    App.reqres.setHandler("wishitems:addItem", function(id){
    	//alert("update:" +id);
        return API.getUpdateWishlist(id);
    });
    
    App.reqres.setHandler("wishitems:removeItem", function(id){
    
        return API.getRemoveWishlist(id);
    });
    
    
  });

  return ;
});
