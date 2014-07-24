define([ "application",'handlebars' ,
         'utils/templateManager',
         'text!layouts/container/content/checkout/content/step1/register/templates/step1Register_template.html',
        // 'layouts/container/content/login/login_app'
         ], function(App,HandleBars,TemplateManager,Step1RegisterTemplate) {
	
	App.module("Content.View", function(View,App,Backbone, Marionette, $, _) {
		
	
		View.RegisterContent = Marionette.ItemView.extend({
			template:TemplateManager.getTemplate(Step1RegisterTemplate),
			
			className:'div-lelft',
			tagName:'div',
			initialize:function(){
				
			},
			
			modelEvents: {
			        'change': 'fieldsChanged'
			 },
			 fieldsChanged: function() {
			        this.render();
			},
			events : {
				//"click a.loginLink" : "navigateToLogin",
				//"click a.logoutLink": "navigateToLogout"
			},
			navigateToLogin : function(e) {
				e.preventDefault();
				
				//this.trigger("loginlink_clicked", this.model);
				//App.trigger("trigger:login",this.model);
			},
			navigateToLogout : function(e) {
				e.preventDefault();
				
				//this.trigger("logoutlink_clicked", this.model);
				//App.trigger("trigger:logout",this.model);
			}	
		});
	});
	
	return App.Content.View;
	
});