define(["application",'backbone.localStorage'], function(App){
  App.module("Entities", function(Entities, App, Backbone, Marionette, $, _){
    Entities.Checkout = Backbone.Model.extend({
    	
    	// defaults : {
        //     items   : [],
        //     language  : 'language'
       // },	
        initialize: function(){}
        
    });

    Entities.Checkouts = Backbone.Collection.extend({
      model: Entities.Checkout,
     // url: REST_URL + "language/list?callback=jsonCallback",
      url: REST_URL + "myorder/list?callback=jsonCallback",
	  initialize: function(){},
	  parse: function (response) {
	        return response;
	  }
    });
    
    Entities.CheckoutCollection = Backbone.Collection.extend({
    	localStorage: new Backbone.LocalStorage("CheckoutLocalStorage"),
    	model: Entities.Checkout,
    	initialize:function(){
    		//this.localStorage.each(function(model) {
    		 //     model.destroy();
    		//    }
    		//)
    		localStorage.clear();
    		//this.collection = options.collection;
    		//this.localStorate = options.collection;
    	}
    })
    
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


    var initializeCheckouts = function(){
    	
    	/*
        var list=   {"items":[
                     {"id":1,"selected":true,"name":"English","img":"en.png"},
                     {"id":2,"selected":false,"name":"Turkey","img":"tr.png"},
                     {"id":3,"selected":false,"name":"Thailand","img":"th.png"}
                    ],
            "language":"language"
           };
        var checkoutCollection = new Entities.CheckoutCollection();
        //var checkoutCollection = new Entities.CheckoutCollection();
        checkoutCollection.create({language:'language'})
    	checkoutCollection.fetch();
    	checkoutCollection.each(function(model) {
    	    model.save();
    	});
    	*/
    	//return checkoutCollection;
        return new Entities.Checkouts();
    };
    
    var initializeUpdateLanguage = function(name){
    	Entities.Model = new Entities.UpdateLanguageModel({name:name});
    	return Entities.Model;
    };
    
    var API = {
      getOrders: function(){
    	  
           Entities.Collection = initializeCheckouts();
        
           Entities.Collection.fetch(
        		   {success:function(data){
        			   //console.info(data);
        			   //console.info('Successfully fetching languages collection with size(' + Entities.Collection.length +')');
        		      
        		   },
        		   error:function(){
         		     // console.info('Error in fectching languages collection');
         		   }
           });     
            
          return Entities.Collection;
         
      },
      updateLanguage:function(name){
     	 
    	  Entities.Collection = initializeUpdateLanguage(name);
          
          Entities.Collection.fetch(
  		   {success:function(){
  			   //console.info('updating currencys collection from locale storage');
  		      //console.info('collection size:'+Entities.Collection.length)
  		   },
  		   error:function(){
   		      //console.info('error populating data');
   		   }
          });     
          return Entities.Collection;
      }
    };

    App.reqres.setHandler("myorder:entities", function(){
        return API.getOrders();
    });
  
    
  });

  return ;
});
