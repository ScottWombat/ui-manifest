define([ "application",'handlebars' ,
         'utils/templateManager',
         'text!layouts/container/content/checkout/steps/templates/steps_template.html',
        // 'layouts/container/content/login/login_app'
         ], function(App,HandleBars,TemplateManager,tpl) {
	
	App.module("Steps.View", function(View,App,Backbone, Marionette, $, _) {
		
		 View.StepsView = Backbone.Model.extend({
			 //save: function (key, val, options) {
			     //this.beforeSave(key, val, options);
			   //  return Backbone.Model.prototype.save.call(this, key, val, options);
			 //},

		});
			
		View.Steps = Marionette.ItemView.extend({
			template:TemplateManager.getTemplate(tpl),
			model: new Backbone.Model({loggedIn:false}),
			//model : new View.StepsView();
			className:'wizard-steps',
			tagName:'div',
			
			initialize:function(options){
				if ( typeof sessionToken === 'undefined'){
					//this.model =new Backbone.Model({loggedIn:false});
					//this.model = new View.StepsView();
					//this.model.on('change', this.render);
				}
			},
			/*
			render: function() {
		            var that = this;
		            var data = {loggedIn: true};
		           // this.model =new Backbone.Model({loggedIn:true});
		            require(['text!layouts/container/content/checkout/steps/templates/steps_template.html'], function(Template){
		               // var html = _.template(Template, data);
		               // that.$el.html(html);
		                var template = TemplateManager.getTemplate(Template);
		                that.$el.html(template);
		            });
		            return this;
		     },
		     */
			//render:function(){
			//	alert("steps render");
				//this.model = new View.StepsView();
			//},
			modelEvents: {
			        'change': 'fieldsChanged'
			 },
			 fieldsChanged: function() {
				 alert("fieldsChanged");
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