define([ "application",'handlebars',
         'utils/templateManager',
         'text!layouts/header/hsecond/cart/templates/cart_template.html',
         'text!layouts/header/hsecond/cart/templates/carts_template.html',
         'text!layouts/header/hsecond/cart/templates/cart_template_orginal.html'
         ], function(App,HandleBars,TemplateManager,tpl,tpl1,tpl2) {
	
	App.module("Cart.View", function(View,App,Backbone, Marionette, $, _) {
		View.Item  = Marionette.ItemView.extend({
			template : TemplateManager.getTemplate(tpl),
			tagName : "table",
			id:'mycart',
			
			initialize:function(){
				//this.model.on('change', this.render);
			},
		
			modelEvents: {
			    'change': 'render'
			},
			collectionEvents : {
				'change': 'render'
			},
			events : {
				"click a.mycart" : "mycart",
				"click a.removeItem": 'removeItem',
				'mouseover .content': 'mouseOver',
				'mouseout .content': 'mouseevent',
				
				
			},
			
			mycart : function(e) {
				e.preventDefault();
				e.stopPropagation();
				this.$el.addClass('active');
				
			},
			removeItem:function(e){
				e.preventDefault();
				App.trigger("cart:removeItem", this.model.get('id'));
			},
			mouseOver:function(){
				this.$el.addClass('active');
			},
			mouseevent:function(){
				//alert('d');
				this.$el.removeClass('active');
			},
			onRender : function() {
				
			},
			//reRender:function(id){
			//	alert('rerender:' +id);
				//this.model = App.request("cart:entities:update",id);
			//	this.model.fetch();
				//render();
			//}
        });
		
		View.Cart = Marionette.CompositeView.extend({
			id:'mycart',
			template : TemplateManager.getTemplate(tpl1),
			itemViewContainer : ".mini-cart-info",
			itemView: View.Item,
			initialize: function(){
				 var items = this.model.get('products');
				 this.collection = new Backbone.Collection(items);
			 },
		events : {
			"click a" : "showCart",
			'mouseover a': 'showCart',
			'mouseout a': 'deactiveHeader',
		    'mouseover #cart-content': 'activeCart',
		    'mouseout #cart-content':'deactiveCart',
		    'click a#viewcart' : 'viewcart',
		    'click a#checkout' : 'checkout'
		},
		viewcart:function(e){
			e.preventDefault();
			$('#mycart').removeClass('active');
			$('#cart-content').css({"display":"none"});
			App.trigger('slider:close');
			App.trigger('viewcart:start');
		},
		checkout:function(e){
			e.preventDefault();
			$('#mycart').removeClass('active');
			$('#cart-content').css({"display":"none"});
			App.trigger('slider:close');
			App.trigger('checkout:start');
		},
		showCart : function(e) {
			e.preventDefault();
			$('#mycart').addClass('active');
			$('#cart-content').css({"display":"block"});
			//$( "#cart-content" ).slideDown( 2000, function() {
			//	 $( this ).css({"display":"block"});
			//});
		
		},
		deactiveHeader:function(e){
			
				$('#mycart').removeClass('active');
				$('#cart-content').css({"display":"none"});
		},
		activeCart:function(e){
			e.preventDefault();
			$('#cart-content').css({"display":"block"});
			$('#mycart').addClass('active');
			
		},
		deactiveCart:function(e){
			$('#mycart').removeClass('active');
			$('#cart-content').css({"display":"none"});
		}
			
		
		});
		
		View.Carts= Marionette.CollectionView.extend({
			itemView : View.Cart,
			
			onRender:function(){
				
			}
		});
		
		
	});
	return App.Cart.View;
});