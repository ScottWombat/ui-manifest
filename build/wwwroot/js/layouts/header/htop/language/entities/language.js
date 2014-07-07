define(["application",'localstorage'], function(App){
  App.module("Entities", function(Entities, App, Backbone, Marionette, $, _){
    Entities.Language = Backbone.Model.extend({
    	 defaults : {
             name   : '',
             img  : ''
        },	
        initialize: function(){}
        
    });

    Entities.Languages = Backbone.Collection.extend({
      model: Entities.Language,
      url: REST_URL + "languages?callback=jsonCallback",
	    initialize: function(){
	        console.info("Languages initialize")
	      
	    },
	    parse: function (response) {
	        return response;
	    }
    });
    
    Entities.UpdateLanguageModel = Backbone.Collection.extend({
        model: Entities.Language,
       // url: REST_URL + "currencies/" + name +"?callback=jsonCallback",
       
  	  initialize: function(options){
  	        this.url= REST_URL + "language/update/" + options.name +"?callback=jsonCallback";
  	    },
  	    parse: function (response) {
  	        return response;
  	    }
      });


    var initializeLanguages = function(){
    	return new Entities.Languages();
    };
    
    var initializeUpdateLanguage = function(name){
        
    	Entities.Model = new Entities.UpdateLanguageModel({name:name});
    	return Entities.Model;
    };
    
    
   
    var API = {
      getLanguages: function(){
    	  
           Entities.Collection = initializeLanguages();
        
           Entities.Collection.fetch(
        		   {success:function(){
        			   console.info('Successfully fetching languages collection with size(' + Entities.Collection.length +')');
        		      
        		   },
        		   error:function(){
         		      console.info('Error in fectching languages collection');
         		   }
           });     
       
          return Entities.Collection;
         
      },
      updateLanguage:function(name){
     	 
    	  Entities.Collection = initializeUpdateLanguage(name);
          
          Entities.Collection.fetch(
  		   {success:function(){
  			   console.info('updating currencys collection from locale storage');
  		      console.info('collection size:'+Entities.Collection.length)
  		   },
  		   error:function(){
   		      console.info('error populating data');
   		   }
          });     
          return Entities.Collection;
      }
    };

    App.reqres.setHandler("language:entities", function(){
        return API.getLanguages();
    });
    App.reqres.setHandler("language:update", function(name){
    	
        return API.updateLanguage(name);
    });
    
    
  });

  return ;
});
