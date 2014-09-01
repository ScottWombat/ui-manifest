define([ "application",
         'utils/templateManager',
         'text!layouts/header/htop/language/templates/langheader_template.html'
         ], function(App,TemplateManager,langheader_tpl) {
	
	App.module("Language.Header.View", function(View,App,Backbone, Marionette, $, _) {
		
        View.Header = Marionette.ItemView.extend({
			
			template : TemplateManager.getTemplate(lang_tpl),
			tagName : "li",
			
			events : {
				"click a" : "navigate",
				'mouseover ul': 'mouseOver',
			},
			navigate : function(e) {
				e.preventDefault();
				//alert("lang click")
				//$('.ullanguages').hide();
				$('#language ul').css({"display":"none"});
				this.render();
				this.trigger("navigate", this.model);
			},
			mouseOver:function(){
				//alert('ddddd');
			},
			onRender : function() {
				if (this.model.selected) {
					// add class so Bootstrap will highlight the active entry in
					// the navbar
					this.$el.addClass("active");
				}
				
			}
		});
		
		View.LangHeaderRegion =  Marionette.Region.extend({
			el: "#language",
			initialize: function(options){
		   
			}
		 
		});
		View.Layout = Marionette.Layout.extend({
			itemViewContainer : "#language",
			template : TemplateManager.getTemplate(container_tpl),
			regions: {
				languageRegion: View.LangHeaderRegion
	        
			},
			initialize: function(){
	    	 // var languageCollection = App.request("language:entities");
	    			    	  
	    	  //this.viewLanguages = new View.Languages({collection:languageCollection});
				this.viewHader = new View.Header();
	    	 
	      	},
	      	onRender: function() {},

		 	 onShow: function() {
				this.languageRegion.show(this.viewHeader);
			
				
		  	}
	      
		});
	});
	
	return App.Language.Header.View;
});