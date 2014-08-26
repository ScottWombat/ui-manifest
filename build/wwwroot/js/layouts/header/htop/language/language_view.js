define([ "application",
         'utils/templateManager',
         'text!layouts/header/htop/language/templates/language_template.html',
         'text!layouts/header/htop/language/templates/languages_template.html',
         'text!layouts/header/htop/language/templates/container_template.html',
         'i18n!nls/locales','i18next'
         ], function(App,TemplateManager,lang_tpl,langs_tpl,container_tpl,locales,i18n) {
	
	App.module("Language.View", function(View,App,Backbone, Marionette, $, _) {
		/************* Language view ************************/
		
		View.Language = Marionette.ItemView.extend({
			
			template : TemplateManager.getTemplate(lang_tpl),
			//template: function () {
			//     var renderedTemplate = TemplateManager.getTemplate(lang_tpl);
			//     return  renderedTemplate(locales);
		    //},
			tagName : "li",
			
			events : {
				"click a" : "navigate",
				//'mouseover ul': 'mouseOver',
			},
			navigate : function(e) {
				e.preventDefault();
				$('#language ul').css({"display":"none"});
				
				var i18NOptions = {
				    	
						detectFromHeaders: false,
						lng:'th-TH',
						fallbackLang: 'en',
						ns: 'app',
						resGetPath: 'locales/__lng__/__ns__.json',
						useCookie: false
						};
				
				$.i18n.init(i18NOptions, function(t) {
			    	  $(document).i18n(); 
			    	  $('.langlink').i18n();
			    	  //Once the translations are loaded translate the whole document
			    	  App.start();
			    });
			
			},
			//mouseOver:function(){
			//	$('#language ul').css({"display":"block"});
			//},
			onRender : function() {
				if (this.model.selected) {
					//alert('d');
					// add class so Bootstrap will highlight the active entry in
					// the navbar
					//this.$el.addClass("active");
					/*
					var locale = localStorage.getItem('locale');
		            if(locale != 'fr-fr') {
		                localStorage.setItem('locale', 'fr-fr');
		                location.reload();
		            }
		            var locale = localStorage.getItem('locale');
		            if(locale != 'en-us') {
		                localStorage.setItem('locale', 'en-us');
		                location.reload();
		            }
		            */
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