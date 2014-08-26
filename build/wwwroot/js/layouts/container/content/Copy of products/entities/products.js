define(["application"], function(Mystore){
  Mystore.module("Entities", function(Entities, Mystore, Backbone, Marionette, $, _){
	
	  Entities.Pagination = Backbone.Model.extend({
		  restAPI : false,
		// defaults:{
		//    pages:0,
		//    records:0
		//},
		  
		  
		  initialize:function(options){
			  this.url = options.url;
			  this.fetch(options);
			  /*
			  this.fetch(
	           		   { 
	           			  success:function(data){
	           			//	 console.log(this.toJSON());
	           			 // console.info('success in fetching pagination' + data.records);
	           		     /// var text =data.fetching.responseText;
	           		     // var obj = JSON.parse(text);
	           		     // console.info(obj.pages +":" + obj.records);
	           		     // self.page1 = obj.pages;
	           		    //  this.pages = obj.pages;
	           		     // console.info('this');
	           		     
	           		   },
	           		   error:function(){
	            		      console.info('error populating pagination');
	            		}
	            });  
	            */
		  },
		  parse:function(response){
			 
			  var hash={};
			hash.p= response.pages;
			 hash.r = response.records;
			
			 return response;
		  },
		
	       fetch: function(){
	           this.fetching = Backbone.Model.prototype.fetch.apply(this, arguments);
	           return this.fetching;
	      }
			
		
	  });
	  /*
	  Entities.PaginationCollection = Backbone.Collection.extend({
	      model: Entities.Pagination,
	      url:'',
	    	     
		  initialize: function(options){
		   
		        this.url = options.url;
		        console.info(this.url);
		      
		    },
		    parse: function (response) {
		    	
		        return response;
		    
		    },
		    getPages: function() {
		    	console.info(this.get("pages"));
		        return '2';
		      }
	    });
	    */
	  
    Entities.Product = Backbone.Model.extend({
        initialize: function(){}
        
    });

    Entities.Products = Backbone.Collection.extend({
      model: Entities.Product,
     
      //localStorage: new Backbone.LocalStorage("ProductCollection"),
	  initialize: function(options){
	        this.url = options.url;
	  },
	 
	   parse: function (response) {
	        return response;
	   }
    });
    
    Entities.ProductList = Backbone.Model.extend({
    	initialize:function(options){
    		this.url = options.url;
    	}
   	 	
     });
  

    var initializeHeaders = function(menuId,pageNumber,pageSize){
    	
    	//var url = REST_URL + "product/list/" + menuId + "/" + pageNumber +"/" + pageSize + "?callback=jsonCallback";
    	var url = REST_URL + "product/productlist/" + menuId + "/" + pageNumber +"/" + pageSize + "?callback=jsonCallback";
    
    	//Entities.Collection = new Entities.Products({menuId:menuId});
    	Entities.Collection = new Entities.Products({url:url});
    	console.info(Entities.Collection);
    	return Entities.Collection;
    };
    
    var initializeProducts = function(menuId,pageNumber,pageSize){
    	var url = REST_URL + "product/list/" + menuId + "/" + pageNumber +"/" + pageSize + "?callback=jsonCallback";
    	//Entities.Collection = new Entities.Products({menuId:menuId});
    	//Entities.Collection = new Entities.Products({url:url});
    	Entities.Collection = new Entities.ProductList({url:url});
    	return Entities.Collection;
    };
    
    var initializePagination = function(menuId,pageSize){
    	var url = REST_URL + "product/count/" + menuId + "/" + pageSize + "?callback=jsonCallback";
    	//Entities.Collection = new Entities.Products({menuId:menuId});
    	//Entities.Collection = new Entities.Products({url:url});
    	Entities.Collection = new Entities.Pagination({url:url});
    	return Entities.Collection;
    }
    
   
    var API = {
      getHeaders: function(menuId,pageNumber,pageSize){
    	 
           Entities.Collection = initializeHeaders(menuId,pageNumber,pageSize);
           Entities.Collection.fetch(
        		   {success:function(){
        			   console.info('fetching products collection from storagefffffff');
        		      //console.info('collection size:'+Entities.Collection.length)
        		   },
        		   error:function(){
         		      //console.info('error populating data');
         		   }
         });     
       
        return Entities.Collection;
      },
      getProducts: function(menuId,pageNumber,pageSize){
     	 
          Entities.Collection = initializeProducts(menuId,pageNumber,pageSize);
          Entities.Collection.fetch(
       		   {success:function(){
       			   //console.info('fetching products collection from storage');
       		       //console.info('collection size:'+Entities.Collection.length)
       		   },
       		   error:function(){
        		     // console.info('error populating data');
        		}
        });     
      
        return Entities.Collection;
       },
       getPagination:function(menuId,pageSize){
    	  
    	   
           var pagination = initializePagination(menuId,pageSize);
           
    	  
    	   return pagination;
    	   
    	   
       }
    
    
    };

    Mystore.reqres.setHandler("products:entities", function(menuId,pageNumber,pageSize){
    	
      return API.getHeaders(menuId,pageNumber,pageSize);
    });
    
    Mystore.reqres.setHandler("products:getProducts", function(menuId,pageNumber,pageSize){
        return API.getProducts(menuId,pageNumber,pageSize);
    });
    
    Mystore.reqres.setHandler("products:pagination", function(menuId,pageSize){
        return API.getPagination(menuId,pageSize);
    });
    
    
    
  });

  return ;
});
