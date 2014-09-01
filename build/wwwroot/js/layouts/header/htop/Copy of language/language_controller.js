define(["application", 
        "layouts/header/htop/language/language_view"], function(App,LanguageLayout){
	
  App.module("Language", function(Language, App, Backbone, Marionette, $, _){
	  Language.Controller = {
			  addLayout: function(){
				  var languageCollection = App.request("language:entities");   
    			 var layout = new LanguageLayout.Layout({languages:languageCollection});
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