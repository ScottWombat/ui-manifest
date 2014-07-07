define([ "application",'handlebars' ,
         'utils/templateManager',
         'text!layouts/header/templates/header_template.html',
         'layouts/header/htop/htop_layout',
         'layouts/header/hsecond/hsecond_layout',
         'layouts/header/menu/menu_layout',
         'layouts/header/menu/entities/catalogues'
         ], function(App,HandleBars,TemplateManager,tpl,Htop,Hsecond,Menu) {
	
	App.module("Header.View", function(View,App,Backbone, Marionette, $, _) {
		
		View.HtopRegion = Marionette.Region.extend({
	    	el: ".htop",
	    	initialize: function(){
	    		console.info('Initialize htop region');
	    		//this.viewLanguage= new LanguageLayout.Layout();
	    	},
	    	onShow: function (view) {
	    		//this.listenTo(view, "itemview:menu:navigate", this.displayMessage);
	    	},
	    	displayMessage: function (id) {
	    		console.log('regionManager received display:message');
	    	}
	    
	    });
		
		View.HsecondRegion = Marionette.Region.extend({
	    	el: ".hsecond",
	    	initialize: function(){
	    		console.info('Initialize hsecond region');
	    	},
	    	onShow: function (view) {
	    		this.listenTo(view, "itemview:menu:navigate", this.displayMessage);
	    	},
	    	displayMessage: function (id) {
	    
	    		console.log('regionManager received display:message');
	    	}
	    
	    });
		
		View.MenuRegion = Marionette.Region.extend({
	    	el: "#menu",
	    	initialize: function(){
	    		console.info('Initialize Menu region');
	    	},
	    	onShow: function (view) {
	    		this.listenTo(view, "itemview:menu:navigate", this.displayMessage);
	    	},
	    	displayMessage: function (id) {
	    
	    		console.log('regionManager received display:message');
	    	}
	    
	    });
		
		View.Layout = Marionette.Layout.extend({
			id:'header',
			template: TemplateManager.getTemplate(tpl),
			tagName:'section',
			regions: {
				
				htopRegion: View.HtopRegion,
				hsecondRegion:View.HsecondRegion,
				menuRegion:View.MenuRegion
	       
			},
			initialize: function(){
				this.viewHtop = new Htop.Layout();
				this.viewHsecond = new Hsecond.Layout();
				var catalogueCollection = App.request("catalogues:entities");
				this.viewMenu = new Menu.Catalogues({collection:catalogueCollection});
	    	  
			},
			onRender: function() {
				
				
			},

			onShow: function() {
				this.htopRegion.show(this.viewHtop);	
				this.hsecondRegion.show(this.viewHsecond);
				this.menuRegion.show(this.viewMenu);
			}
		});
	 
		
	});
	return App.Header.View;
});