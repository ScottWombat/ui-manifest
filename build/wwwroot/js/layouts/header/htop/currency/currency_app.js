define([ "application",'layouts/header/htop/currency/currency_controller','layouts/header/htop/currency/entities/currency'], function(App,Controller) {
	
	App.module("CurrencyLayout", function(Main, App, Backbone,Marionette, $, _) {

		var API = {
			layout : function() {
				
				Controller.addLayout();
			},
			updateCurrency:function(name){
				Controller.updateCurrency(name);
			}
		
		};
		
		App.on("currency:change",function(name1){
		   
			API.updateCurrency(name1);
		});

		App.on("start", function() {
		
			API.layout();
		});
	});

	return App.CurrencyLayout;
});