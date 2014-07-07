define([ "application",'handlebars' ,
         'utils/templateManager',
         'text!layouts/header/htop/links/checkout/templates/checkout_template.html'
         ], function(App,HandleBars,TemplateManager,tpl) {
	
	App.module("Checkout.View", function(View,App,Backbone, Marionette, $, _) {
		View.Checkout = Marionette.ItemView.extend({
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
	return App.Checkout.View;
	
});