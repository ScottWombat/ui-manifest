define([ "application",'handlebars' ,
         'utils/templateManager',
         'text!layouts/container/content/checkout/content/step1/login/templates/step1Login_template.html',
        // 'layouts/container/content/login/login_app'
         ], function(App,HandleBars,TemplateManager,Step1LoginTemplate) {
	
	App.module("Content.View", function(View,App,Backbone, Marionette, $, _) {
		
	
		View.LoginContent = Marionette.ItemView.extend({
			//template:TemplateManager.getTemplate(Step1LoginTemplate),
			el: $("#stepcontent"),
			className:'div-lelft',
			tagName:'div',
			index:1,
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
		
		 renderStep1: function () {
			    alert("DDD");
				var self = this;
				//var compiledHtml = _.template(self.Step1LoginTemplate, {});
				//this.$el.html(compiledHtml);
				var compiledHTML = TemplateManager.getTemplate(Step1LoginTemplate);
				this.$el.html(compiledHTML);
				$(this).html("DD");
			},
			modelEvents: {
			        'change': 'fieldsChanged'
			 },
			 fieldsChanged: function() {
			        this.render();
			},
			
			events : {
				"click #button-login" : "navigateToLogin",
				//"click a.logoutLink": "navigateToLogout"
			},
			navigateToLogin : function(e) {
				e.preventDefault();
				//alert("here");
				App.trigger("step1:login");
			
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