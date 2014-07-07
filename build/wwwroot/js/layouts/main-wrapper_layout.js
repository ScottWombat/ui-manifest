define([ "application",'utils/templateManager',
         'text!layouts/templates/main-wrapper_template.html'
         ], function(App,TemplateManager,tpl) {
	
	App.module("MainWrapper.View", function(View,App,Backbone, Marionette, $, _) {
		
		
		View.Slider  = Marionette.ItemView.extend({
			template : TemplateManager.getTemplate(tpl),

			tagName : "div",
			className:'container',
			
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
		
		
		View.Layout = Marionette.Layout.extend({
		    //id:'main-wrapper1',
			template: TemplateManager.getTemplate(tpl),
			//tagName:'div',
			//regions: {
				
			//	htopRegion: View.HtopRegion,
			//	hsecondRegion:View.HsecondRegion,
			//	menuRegion:View.MenuRegion
	       
			//},
			initialize: function(){
				//this.viewHtop = new Htop.Layout();
				//this.viewHsecond = new Hsecond.Layout();
				//var catalogueCollection = App.request("catalogues:entities");
				//this.viewMenu = new Menu.Catalogues({collection:catalogueCollection});
	    	  
			},
			onRender: function() {
				
				
			},

			onShow: function() {
				//this.htopRegion.show(this.viewHtop);	
				//this.hsecondRegion.show(this.viewHsecond);
				//this.menuRegion.show(this.viewMenu);
				//this.
			}
		});
	 
	});
	return App.MainWrapper.View;
});