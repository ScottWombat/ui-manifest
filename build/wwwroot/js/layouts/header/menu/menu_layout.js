define([ "application",'handlebars' ,
         'utils/templateManager',
         'text!layouts/header/menu/templates/catalogue_template.html',
         'text!layouts/header/menu/templates/catalogues_template.html'
         ], function(App,HandleBars,TemplateManager,cat_tpl,cats_tpl) {
	
	App.module("Catalogues.View", function(View,App,Backbone, Marionette, $, _) {
		
		 View.Catalogue = Marionette.ItemView.extend({
				template : TemplateManager.getTemplate(cat_tpl),
				tagName : "li",
				className:'categories_hor',
				
				events : {
					"click a" : "navigate",
					"click #brandImg": "doImageClick",
					'mouseover a': 'mouseOver'
				},
				
				navigate : function(e) {
					e.preventDefault();
					e.stopPropagation();
					var menuId = $(e.currentTarget).attr('id');
					
					$('.categories_hor  > div > .column ').css({"display":"none"});
					this.trigger("menu:navigate",menuId,menuId);
					
				},
				doImageClick:function(e){
					e.preventDefault();
					var name = $(e.currentTarget).attr('name');
					var tarr = name.split('/');      
					var catName = tarr[0];
					var brand = tarr[tarr.length-1]; 
					var key = catName +"/"+brand;
					
					$('.categories_hor  > div > .column ').css({"display":"none"});
					this.trigger("menu:brandClick",key,key);
				},
				mouseOver : function(e){
					e.preventDefault();
					
					$('.categories_hor > div > .column').css({"display":"block"});
				},
				onRender : function() {
					if (this.model.selected) {
						this.$el.addClass("active");
					}
					
				}
			});
			View.Catalogues = Marionette.CompositeView.extend({
				template : TemplateManager.getTemplate(cats_tpl),
				itemViewContainer : "ul",
				itemView : View.Catalogue
				
		   });
		
	});
	return App.Catalogues.View;
});