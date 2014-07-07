define(["application",'localstorage'], function(App){
  App.module("Entities", function(Entities, App, Backbone, Marionette, $, _){
    Entities.Currency = Backbone.Model.extend({
    	 defaults : {
    		 id		:'',
             name   : ''
     
        },	
        initialize: function(){}
        
    });

    Entities.Currencies = Backbone.Collection.extend({
      model: Entities.Currency,
      url: REST_URL + "currencies?callback=jsonCallback",
     
	  initialize: function(){
	        console.info("Currencies initialize")
	      
	    },
	    parse: function (response) {
	        return response;
	    }
    });
    
    Entities.UpdateCurrencyModel = Backbone.Collection.extend({
        model: Entities.Currency,
       // url: REST_URL + "currencies/" + name +"?callback=jsonCallback",
       
  	  initialize: function(options){
  	        console.info("Currencies initialize")
  	      // 	alert(options.name);
  	      this.url= REST_URL + "currency/update/" + options.name +"?callback=jsonCallback";
  	      
  	    },
  	    parse: function (response) {
  	        return response;
  	    }
      });

    var initializeCurrencies = function(){
    	Entities.Collection = new Entities.Currencies();
    	return Entities.Collection;
    };
    
    var initializeUpdateCurrency = function(name1){
    
    	Entities.Model = new Entities.UpdateCurrencyModel({name:name1});
    	return Entities.Model;
    };
    
   
    var API = {
    	  getCurrencies: function(){
    		  
    		  	Entities.Collection = initializeCurrencies();
          
                Entities.Collection.fetch(
        		   {success:function(){
        			   console.info('fetching currencys collection from locale storage');
        		      console.info('collection size:'+Entities.Collection.length)
        		   },
        		   error:function(){
         		      console.info('error populating data');
         		   }
                });     
                return Entities.Collection;
          },
          updateCurrency:function(name1){
        	 
        	  Entities.Collection = initializeUpdateCurrency(name1);
              
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

    App.reqres.setHandler("currency:entities", function(){
        return API.getCurrencies();
    });
    App.reqres.setHandler("currency:update", function(name1){
    	
        return API.updateCurrency(name1);
    });
    
  });

  return ;
});
