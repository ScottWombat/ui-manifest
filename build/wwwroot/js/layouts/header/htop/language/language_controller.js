define(["application", 
        "layouts/header/htop/language/language_view"], function(App,LanguageLayout){
	
  App.module("Language", function(Language, App, Backbone, Marionette, $, _){
	  
	  Language.Model = Backbone.Model.extend();
	  
	  Language.Controller = {
			  addLayout: function(){
				 var languageCollection = App.request("language:entities");  
				 
				 console.info('ddd');
				 console.info(languageCollection)
				 // var languageCollection ={"items":[{"id":1,"selected":true,"name":"English","img":"en.png"},{"id":2,"selected":true,"name":"Turkey","img":"tr.png"},{"id":3,"selected":false,"name":"Thailand","img":"th.png"}],"language":"language"};
    			 //var languageCollection = new Language.Model({"items":[{"id":1,"selected":true,"name":"English","img":"en.png"},{"id":2,"selected":true,"name":"Turkey","img":"tr.png"},{"id":3,"selected":false,"name":"Thailand","img":"th.png"}],"language":"language"});
				//  var layout = new LanguageLayout.Layout({languages:languageCollection});
				var layout = new LanguageLayout.LanguageList({collection:languageCollection});
    			 App.languageRegion.show(layout);
			  },
			  updateLanguage:function(name){
				  var languageCollection =App.request("language:update",name);
				  this.layout = new LanguageLayout.Layout({languages:languageCollection});
		    	  App.languageRegion.show(this.layout);
			
			  }
	  };
  });

  return App.Language.Controller;
});

/*
define(["application", "layouts/header/header_layout"], function(App, HeaderLayout){
	
	  App.module("Main", function(Main, App, Backbone, Marionette, $, _){
	    Main.Controller = {
	       addLayout: function(){
	    			 var layout = new HeaderLayout.Layout();
	    			 App.mainwrapper.show(layout);
	      }
	    };
	  });

	  return App.Main.Controller;
	});

*/