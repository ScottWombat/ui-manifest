define([ "application",'handlebars' ,
         'utils/templateManager',
         'text!layouts/header/htop/currency/templates/currency_template.html',
         'text!layouts/header/htop/currency/templates/currencies_template.html',
         'text!layouts/header/htop/currency/templates/container_template.html'
         ], function(App,HandleBars,TemplateManager,lang_tpl,langs_tpl,container_tpl) {
	
	App.module("Currency.View", function(View,App,Backbone, Marionette, $, _) {
		/************* Language view ************************/
		
		View.Currency = Marionette.ItemView.extend({
			
			template : TemplateManager.getTemplate(lang_tpl),
			tagName : "li",
			
			events : {
				"click a" : "navigate",
			},
			navigate : function(e) {
				e.preventDefault();
				$('#currency ul').css({"display":"none"});
				//var name1 =this.model.get('name');
				//alert(this.model.get('name'));
				App.trigger("currency:change", this.model.get('name'));
			},
			onRender : function() {
				if (this.model.selected) {
					// add class so Bootstrap will highlight the active entry in
					// the navbar
					//this.$el.addClass("active");
					// this.ui.checkbox.addClass('checked');
				}
				
			}
		});
		
		View.Currencies = Marionette.CompositeView.extend({
			template : TemplateManager.getTemplate(langs_tpl),
			itemViewContainer : ".ulCurrencies",
			itemView : View.Currency,
			events : {
				"click span" : "navigate",
				'mouseover span': "showCurrencies",
				'mouseout span': "deactiveCurrencies",
				'mouseover ul': 'activeList',
				'mouseout ul': 'deactiveList',
			},
			showCurrencies:function(e){
				e.preventDefault();
				$('#currency ul').css({"display":"block"});
				$('#currency ul').addClass("active");
			},
			deactiveCurrencies:function(e){
				e.preventDefault();
				//$('#language ul').css({"display":"none"});
				//$('#language ul').addClass("active");
				$('#currency ul').removeClass('active');
				$('#currency ul').css({"display":"none"});
			},
			activeList : function(e) {
				e.preventDefault();
			    //alert("showlist");
				$('#currency ul').css({"display":"block"});
				$('#currency ul').addClass("active");
			
			},
			deactiveList:function(){
				$('#currency ul').css({"display":"none"});
				$('#currency ul').removeClass('active');
			}
			
		});
		
		
		
		View.CurrenciesView= Marionette.CollectionView.extend({
			itemView : View.Currencies,
			onRender:function(){
				
			}
		});
		
		View.CurrencyRegion =  Marionette.Region.extend({
			 el: "#currency",
			
			 initialize: function(options){
			   
			 }
			 
		 });
		
		 View.Layout = Marionette.Layout.extend({
			  itemViewContainer : "#currency",
			  template : TemplateManager.getTemplate(container_tpl),
		      regions: {
		        currencyRegion: View.CurrencyRegion
		        
		      },
		      initialize: function(options){
		    	 // var currencyCollection = App.request("currency:entities");   	
		    	  var currencyCollection = options.currencies;
		    	  this.viewCurrencies = new View.Currencies({collection:currencyCollection});
		    	
		      },
		      onRender: function() {
		    	  
		      },

			  onShow: function() {
					this.currencyRegion.show(this.viewCurrencies);
				
					
			  }
		      
		});
		
	 
		
	});
	return App.Currency.View;
});