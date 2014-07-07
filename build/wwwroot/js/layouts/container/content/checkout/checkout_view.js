define([ "application",
         'utils/templateManager',
         'text!layouts/container/content/checkout/templates/checkout_template.html',
         'commons/custom'
         ], function(App,TemplateManager,tpl) {
	
	App.module("ViewCart.View", function(View,App,Backbone, Marionette, $, _) {
		View.Item  = Marionette.ItemView.extend({
			template : TemplateManager.getTemplate(tpl),
			tagName : "div",
			id:'mainshow',
			
			
			initialize:function(){
				//this.model.on('change', this.render);
			},
			
			mouseOver:function(){
				this.$el.addClass('active');
			},
			mouseevent:function(){
				//alert('d');
				this.$el.removeClass('active');
			},
			onRender : function() {
				
			}
        });
		
		
		
		
	});
	return App.ViewCart.View;
});