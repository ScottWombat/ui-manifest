define([ "application",'handlebars' ,
         'utils/templateManager',
         'text!layouts/header/htop/links/signup/templates/signup_template.html'
         ], function(App,HandleBars,TemplateManager,tpl) {
	
	App.module("Signup.View", function(View,App,Backbone, Marionette, $, _) {
		
		View.SignupModel = Backbone.Model.extend({
			defaults:{
				email: '',
				pwd:'',
				confirm:''
			}
		});
		
		View.Signup = Marionette.ItemView.extend({
			template:TemplateManager.getTemplate(tpl),
			model : new View.SignupModel(),
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
				"click a.signupLink" : "navigateToSignup",
				"click a.logoutLink": "navigateToLogout"
			},
			navigateToSignup : function(e) {
				e.preventDefault();
				require([ "layouts/container/content/signup/signup_app"], function(Sigup) {
					App.trigger("trigger:signup",this.model);
				});
				//alert('signip');
				//this.trigger("loginlink_clicked", this.model);
			},
			navigateToLogout : function(e) {
				e.preventDefault();
				
				this.trigger("logoutlink_clicked", this.model);
			}	
		});
	});
	
	return App.Signup.View;
	
});