define([ "application",'handlebars' ,
         'utils/templateManager',
         'text!layouts/header/htop/links/login/templates/login_template.html',
         'layouts/container/content/login/login_app'
         ], function(App,HandleBars,TemplateManager,tpl) {
	
	App.module("Login.View", function(View,App,Backbone, Marionette, $, _) {
		
		View.LoginModel = Backbone.Model.extend({
			defaults:{
				loggedIn: false,
				loginMsg:''
			}
		});
		
		View.Login = Marionette.ItemView.extend({
			template:TemplateManager.getTemplate(tpl),
			model : new View.LoginModel(),
			className:'login',
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
				"click a.loginLink" : "navigateToLogin",
				"click a.logoutLink": "navigateToLogout"
			},
			navigateToLogin : function(e) {
				e.preventDefault();
				
				//this.trigger("loginlink_clicked", this.model);
				App.trigger("trigger:login",this.model);
			},
			navigateToLogout : function(e) {
				e.preventDefault();
				
				//this.trigger("logoutlink_clicked", this.model);
				App.trigger("trigger:logout",this.model);
			}	
		});
	});
	
	return App.Login.View;
	
});