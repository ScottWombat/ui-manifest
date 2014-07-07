define(["application", 
        "layouts/header/htop/currency/currency_view"], function(App,CurrencyLayout){
	
  App.module("Currency", function(Currency, App, Backbone, Marionette, $, _){
	  Currency.Controller = {
			  addLayout: function(){
				 var currencyCollection = App.request("currency:entities");   
				 this.layout = new CurrencyLayout.Layout({currencies:currencyCollection});
	    		 App.currencyRegion.show(this.layout);
			  },
			  updateCurrency:function(name1){
				
				  var currencyCollection =App.request("currency:update",name1);
				  
				  $.when(currencyCollection).done(function(cCollection){
					  this.layout = new CurrencyLayout.Layout({currencies:cCollection});
				
			    	  App.currencyRegion.show(this.layout);
			    	 
		         });
				  App.trigger("cart:cart");
			
			  }
	  };
  });

  return App.Currency.Controller;
});