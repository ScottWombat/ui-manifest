define([ "application",
         'utils/templateManager',
         'text!layouts/header/htop/language/templates/language_template.html',
         'text!layouts/header/htop/language/templates/languages_template.html',
         'text!layouts/header/htop/language/templates/container_template.html',
         ], function(App,TemplateManager,lang_tpl,langs_tpl,container_tpl) {
	
	App.module("Language.View", function(View,App,Backbone, Marionette, $, _) {
		/************* Language view ************************/
		
		View.Language = Marionette.ItemView.extend({
			
			template : TemplateManager.getTemplate(lang_tpl),
			tagName : "li",
			
			events : {
				"click a" : "navigate",
				//'mouseover ul': 'mouseOver',
			},
			navigate : function(e) {
				e.preventDefault();
				$('#language ul').css({"display":"none"});
				App.trigger("language:change", this.model.get('name'));
			},
			//mouseOver:function(){
			//	$('#language ul').css({"display":"block"});
			//},
			onRender : function() {
				if (this.model.selected) {
					// add class so Bootstrap will highlight the active entry in
					// the navbar
					//this.$el.addClass("active");
				}
				
			}
		});
		
		View.Languages = Marionette.CompositeView.extend({
			template : TemplateManager.getTemplate(langs_tpl),
			itemViewContainer : ".ullanguages",
			itemView : View.Language,
			events : {
				"click span" : "navigate",
				'mouseover span': "showLanguages",
				'mouseout span': "deactiveLanguages",
				'mouseover ul': 'activeList',
				'mouseout ul': 'deactiveList',
			},
			showLanguages:function(e){
				e.preventDefault();
				$('#language ul').css({"display":"block"});
				$('#language ul').addClass("active");
			},
			deactiveLanguages:function(e){
				e.preventDefault();
				//$('#language ul').css({"display":"none"});
				//$('#language ul').addClass("active");
				$('#language ul').removeClass('active');
				$('#language ul').css({"display":"none"});
			},
			activeList : function(e) {
				e.preventDefault();
			    //alert("showlist");
				$('#language ul').css({"display":"block"});
				$('#language ul').addClass("active");
			
			},
			deactiveList:function(){
				$('#language ul').css({"display":"none"});
				$('#language ul').removeClass('active');
			}
			
		});
		
		
		
		 View.LanguageRegion =  Marionette.Region.extend({
			 el: "#language",
			 initialize: function(options){
			   
			 }
			 
		 });
		
		 View.Layout = Marionette.Layout.extend({
			  itemViewContainer : "#language",
			  template : TemplateManager.getTemplate(container_tpl),
		      regions: {
		        languageRegion: View.LanguageRegion
		        
		      },
		      initialize: function(options){
		    	 // var languageCollection = App.request("language:entities");
		    	  var languageCollection = options.languages;	    	  
		    	  this.viewLanguages = new View.Languages({collection:languageCollection});
		    	 
		    	 
		      },
		      onRender: function() {},

			  onShow: function() {
					this.languageRegion.show(this.viewLanguages);
				
					
			  }
		      
		});
	 
		
	});
	return App.Language.View;
});