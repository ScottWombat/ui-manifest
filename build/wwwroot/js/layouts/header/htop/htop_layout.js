define([ "application",'handlebars' ,
         'utils/templateManager',
         'text!layouts/header/htop/templates/htop_template.html',
         'layouts/header/htop/language/language_view',
         'layouts/header/htop/currency/currency_view',
         'layouts/header/htop/links/links_layout',
         'layouts/header/htop/language/entities/language',
         'layouts/header/htop/currency/entities/currency',
         ], function(App,HandleBars,TemplateManager,tpl,LanguageView,CurrencyView,LinksView) {
	
	App.module("Htop.View", function(View,App,Backbone, Marionette, $, _) {
		
		View.LanguageRegion = Marionette.Region.extend({
	    	el: "#language",
	    	initialize: function(){
	    		//console.info('Initialize language region');
	    		//this.viewLanguage= new LanguageLayout.Layout();
	    	},
	    	onShow: function (view) {
	    		//this.listenTo(view, "itemview:menu:navigate", this.displayMessage);
	    	},
	    	displayMessage: function (id) {
	    
	    		//console.log('regionManager received display:message');
	    	}
	    
	    });
		
		View.CurrencyRegion = Marionette.Region.extend({
	    	el: "#currency",
	    	initialize: function(){
	    		console.info('Initialize currency region');
	    	},
	    	onShow: function (view) {
	    		this.listenTo(view, "itemview:menu:navigate", this.displayMessage);
	    	},
	    	displayMessage: function (id) {
	    
	    		//console.log('regionManager received display:message');
	    	}
	    
	    });
		/*
		View.SupportedRegion = Marionette.Region.extend({
	    	el: "#supoorted",
	    	initialize: function(){
	    		console.info('Initialize currency region');
	    	},
	    	onShow: function (view) {
	    		this.listenTo(view, "itemview:menu:navigate", this.displayMessage);
	    	},
	    	displayMessage: function (id) {
	    
	    		//console.log('regionManager received display:message');
	    	}
	    
	    });
		*/
		View.LinksRegion = Marionette.Region.extend({
	    	el: ".links",
	    	initialize: function(){
	    		console.info('Initialize links region');
	    	},
	    	onShow: function (view) {
	    		this.listenTo(view, "itemview:menu:navigate", this.displayMessage);
	    	},
	    	displayMessage: function (id) {
	    
	    		//console.log('regionManager received display:message');
	    	}
	    
	    });
		
		
		
		View.Layout = Marionette.Layout.extend({
			//id:'htop',
			template: TemplateManager.getTemplate(tpl),
			//tagName:'div',
			regions: {
				
				languageRegion: View.LanguageRegion,
				currencyRegion:View.CurrencyRegion,
				
				linksRegion:View.LinksRegion
	       
			},
			initialize: function(){
				//var languageCollection = App.request("language:entities");
				var languageCollection ={"items":[{"id":1,"selected":true,"name":"English1","img":"en.png"},{"id":2,"selected":true,"name":"Turkey","img":"tr.png"},{"id":3,"selected":false,"name":"Thailand","img":"th.png"}],"language":"language"};
				//console.info('dd');
				//console.info(languageCollection);
				//this.viewLanguages= new LanguageView.Languages({collection:languageCollection});
				this.viewLanguages= new LanguageView.LanguageList({model:languageCollection});
				
				var currencyCollection = App.request("currency:entities");
				//this.viewCurrencies= new CurrencyView.Currencies({collection:currencyCollection});
				
				this.viewCurrencies= new CurrencyView.CurrenciesView({collection:currencyCollection});
				
				this.viewLinks = new LinksView.LinksLayout();
				
				//this.viewSupported = new SupportedView.Support();
		
	    	  
			},
			onRender: function() {},

			onShow: function() {
				
				//this.languageRegion.show(this.viewLanguages);	
				//this.currencyRegion.show(this.viewCurrencies);
				
			    this.linksRegion.show(this.viewLinks);
			}
		});
	 
		
	});
	return App.Htop.View;
});