define(["application",'localstorage'], function(Mystore){
  Mystore.module("Entities", function(Entities, Mystore, Backbone, Marionette, $, _){
    Entities.Catalogue = Backbone.Model.extend({
    	 defaults : {
    		 id		:'',
             menu   : ''
     
        },	
        initialize: function(){}
        
    });

    Entities.Catalogues = Backbone.Collection.extend({
      model: Entities.Catalogue,
      url: REST_URL + "catalogues?callback=jsonCallback",
     
	  initialize: function(){
	        console.info("Catalogues initialize")
	      
	    },
	    parse: function (response) {
	        return response;
	    }
    });

    var initializeHeaders = function(){
    	Entities.Collection = new Entities.Catalogues();
    	return Entities.Collection;
    };
    
   
    var API = {
      getHeaders: function(){
    	
           Entities.Collection = initializeHeaders();
           Entities.Collection.fetch(
        		   {success:function(){
        			   console.info('fetching catalogues collection from locale storage');
        		      console.info('collection size:'+Entities.Collection.length)
        		   },
        		   error:function(){
         		      console.info('error populating data');
         		   }
         });     
       
        return Entities.Collection;
      }
    };

    Mystore.reqres.setHandler("catalogues:entities", function(){
      return API.getHeaders();
    });
  });

  return ;
});
