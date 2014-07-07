define([ "application",'handlebars' ,
         'utils/templateManager',
         'text!layouts/header/htop/links/contact/templates/contact_template.html'
         ], function(App,HandleBars,TemplateManager,tpl) {
	
	App.module("Contact.View", function(View,App,Backbone, Marionette, $, _) {
				
		View.Contact = Marionette.ItemView.extend({
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
	
	return App.Contact.View;
	
});