define([ "application",'handlebars' ,
         'utils/templateManager',
         'text!layouts/container/content/checkout/steps/templates/checkout_steps_template.html',
        // 'layouts/container/content/login/login_app'
         ], function(App,HandleBars,TemplateManager,tpl) {
	
	App.module("Steps.View", function(View,App,Backbone, Marionette, $, _) {
		
			
		View.Steps = Marionette.ItemView.extend({
			template:TemplateManager.getTemplate(tpl),
			model: new Backbone.Model({loggedIn:true}),
			className:'wizard-steps',
			tagName:'div',
			initialize:function(){
				if ( typeof sessionToken === 'undefined'){
					this.model =new Backbone.Model({loggedIn:false});
				}
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
	
	return App.Steps.View;
	
});