define([ "application",
         'utils/templateManager',
         'text!layouts/header/hsecond/cart/templates/cart_template.html'
         ], function(App,TemplateManager,tpl) {
	
	App.module("Cart.View", function(View,App,Backbone, Marionette, $, _) {
		View.Cart  = Marionette.ItemView.extend({
			template : TemplateManager.getTemplate(tpl),
		   
			id:'mycart',
			model : App.request("cart:entities"),
			initialize:function(){
				this.model.on('change', this.render);
			},
			'modelEvents': {
			    'change': 'render'
			},
			events : {
				"click a.mycart" : "navigate",
				'mouseover .content': 'mouseOver',
				'mouseout .content': 'mouseevent'
				
			},
			
			navigate : function(e) {
				e.preventDefault();
				e.stopPropagation();
				this.$el.addClass('active');
				
			},
			mouseOver:function(){
				this.$el.addClass('active');
			},
			mouseevent:function(){
				//alert('d');
				this.$el.removeClass('active');
			},
			onRender : function() {
				//if (this.model.selected) {
					
				//	this.$el.addClass("active");
				//}
				//alert("onchange");
				
				//this.model.fetch();
				alert('render');
				
			},
			reRender:function(id){
				alert('rerender:' +id);
				//this.model = App.request("cart:entities:update",id);
				this.model.fetch();
				//render();
			}
        });
		
	});
	return App.Cart.View;
});