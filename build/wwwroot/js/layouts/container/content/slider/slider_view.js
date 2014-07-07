define([ "application",
         'utils/templateManager',
         'text!layouts/container/content/slider/templates/slider_template.html',
         'commons/custom'
         ], function(App,TemplateManager,tpl) {
	
	App.module("Slider.View", function(View,App,Backbone, Marionette, $, _) {
		View.Item  = Marionette.ItemView.extend({
			template : TemplateManager.getTemplate(tpl),
			tagName : "div",
			id:'slidershow',
			
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
	return App.Slider.View;
});