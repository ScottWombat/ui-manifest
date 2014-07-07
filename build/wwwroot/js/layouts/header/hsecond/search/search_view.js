define([ "application",
         'utils/templateManager',
         'text!layouts/header/hsecond/search/templates/search_template.html'
         ], function(App,TemplateManager,tpl) {
	
	App.module("Search.View", function(View,App,Backbone, Marionette, $, _) {
		 View.Search  = Marionette.ItemView.extend({
				template : TemplateManager.getTemplate(tpl),
				tagName : "div",
				className:'search',
				
				events : {
					"click a" : "navigate",
				},
				
				navigate : function(e) {
					e.preventDefault();
					e.stopPropagation();
					var menuId = $(e.currentTarget).attr('id');
				
					this.trigger("menu:navigate",menuId,menuId);
					// this.trigger("menu:navigate",menuId);
				},
				onRender : function() {
					//if (this.model.selected) {
						
					//	this.$el.addClass("active");
					//}
					
				}
		 });
	});
	return App.Search.View;
});