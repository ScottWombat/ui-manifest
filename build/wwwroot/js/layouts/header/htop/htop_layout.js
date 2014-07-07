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
	    		console.info('Initialize language region');
	    		//this.viewLanguage= new LanguageLayout.Layout();
	    	},
	    	onShow: function (view) {
	    		//this.listenTo(view, "itemview:menu:navigate", this.displayMessage);
	    	},
	    	displayMessage: function (id) {
	    
	    		console.log('regionManager received display:message');
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
	    
	    		console.log('regionManager received display:message');
	    	}
	    
	    });
		
		View.LinksRegion = Marionette.Region.extend({
	    	el: ".links",
	    	initialize: function(){
	    		console.info('Initialize links region');
	    	},
	    	onShow: function (view) {
	    		this.listenTo(view, "itemview:menu:navigate", this.displayMessage);
	    	},
	    	displayMessage: function (id) {
	    
	    		console.log('regionManager received display:message');
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
				var languageCollection = App.request("language:entities");
				this.viewLanguages= new LanguageView.Languages({collection:languageCollection});
				
				var currencyCollection = App.request("currency:entities");
				this.viewCurrencies= new CurrencyView.Currencies({collection:currencyCollection});
				
				this.viewLinks = new LinksView.LinksLayout();
		
	    	  
			},
			onRender: function() {},

			onShow: function() {
				
				this.languageRegion.show(this.viewLanguages);	
				this.currencyRegion.show(this.viewCurrencies);
			    this.linksRegion.show(this.viewLinks);
			}
		});
	 
		
	});
	return App.Htop.View;
});