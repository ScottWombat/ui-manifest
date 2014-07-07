define([ "application",
         'utils/templateManager',
         'text!layouts/header/hsecond/templates/hsecond_template.html',
         'layouts/header/hsecond/cart/entities/cart',
         'layouts/header/hsecond/cart/cart_view',
         'layouts/header/hsecond/search/search_view',
         'layouts/header/hsecond/cart/cart_app'
         ], function(App,TemplateManager,tpl,Cart,CartView,SearchView,CartApp) {
	
		App.module("Hsecond.View", function(View,App,Backbone, Marionette, $, _) {
			
			View.SearchRegion = Marionette.Region.extend({
		    	el: "#search",
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
			
			View.CartRegion = Marionette.Region.extend({
		    	el: "#cart",
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
				id:"myhsecond",
				//className : 'hsecond',
				itemViewContainer :'section',
				//tagName:'section',
				template: TemplateManager.getTemplate(tpl),
				regions: {
					//searchRegion: "#search",
					searchRegion: View.SearchRegion,
					cartRegion:View.CartRegion
		       
				},
				initialize: function(){
					this.viewSearch= new SearchView.Search();
					
				var cartCollection = App.request("cart:entities");
				this.viewCart = new CartView.Carts({collection:cartCollection});
				 CartApp.getView(this.viewCart);
				 // console.info(this.viewCart);
		    	  
				},
				onRender: function() {},

				onShow: function() {
					this.searchRegion.show(this.viewSearch);	
				
					this.cartRegion.show(this.viewCart);
				}
			});
		 
		 
	});
	
	return App.Hsecond.View;
	
});