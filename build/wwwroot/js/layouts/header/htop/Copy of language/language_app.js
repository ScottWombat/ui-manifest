define([ "application",'layouts/header/htop/language/language_controller','layouts/header/htop/language/entities/language'], function(App,Controller) {
	
	App.module("LanguageLayout", function(Main, App, Backbone,Marionette, $, _) {

		var API = {
			layout : function() {
				
				Controller.addLayout();
			},
			updateLanguage:function(name){
				Controller.updateLanguage(name);
			}
		  
		};

		App.on("start", function() {
			API.layout();
		});
		App.on("language:change",function(name){
			API.updateLanguage(name)
		});
	});

	return App.LanguageLayout;
});