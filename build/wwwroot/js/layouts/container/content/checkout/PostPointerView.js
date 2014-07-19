define([ "application",'handlebars' ,
         'utils/templateManager',
         'text!layouts/container/content/checkout/templates/new.html',
        // 'layouts/container/content/login/login_app'
         ], function(App,HandleBars,TemplateManager,tpl) {
	
	App.module("Poster.View", function(View,App,Backbone, Marionette, $, _) {
		
	
		View.Content = Marionette.ItemView.extend({
			
			//el: $("#new"),
			//template:TemplateManager.getTemplate(tpl),
			
			className:'div-lelft',
			tagName:'div',
			initialize:function(){
				
			},
			render: function() {
				var self = this;
				if (this.index == 1) {
				// Render Step 1
				this.renderStep1();
				} else {
				// Render Step 2
				//this.renderStep2();
				}
				// Need to recreate the page once the thing is loaded
				//this.$el.page('destroy').page();
				//this.$el.page.trigger('create');
				// Currently the return does nothing
				console.log('[PostPointerView] Rendering Complete');
				return this;
			},
			renderStep1 :function(){
				alert("DDD")
				var self = this;
				this.template:TemplateManager.getTemplate(self.tpl),
			}
			
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
	
	return App.Poster.View;
	
});