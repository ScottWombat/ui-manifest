define([ "application",'handlebars' ,
         'utils/templateManager',
         'text!layouts/header/htop/links/myaccount/templates/myaccount_template.html'
         ], function(App,HandleBars,TemplateManager,tpl) {
	
	App.module("Myaccount.View", function(View,App,Backbone, Marionette, $, _) {
				
		View.Myaccount = Marionette.ItemView.extend({
			template:TemplateManager.getTemplate(tpl),
			tagname:'div',
			events : {
				"click a.signupLink" : "navigateToSignup"
				
			},
			navigateToSignup : function(e) {
				e.preventDefault();
				
				this.trigger("signuplink_clicked");
			}
		
		});
	});
	
	return App.Myaccount.View;
	
});