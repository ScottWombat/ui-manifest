define([ 'application',
         'utils/templateManager',
         'text!layouts/container/content/checkout/content/step1/templates/step1_template.html',
         'text!layouts/container/content/checkout/content/step1/templates/hello.html',
         'layouts/container/content/checkout/content/step1/login/step1Login_view',
         'layouts/container/content/checkout/content/step1/register/step1RegisterContent'
         ], function(App,TemplateManager,Step1Template,hello,Step1Login,Step1Register,Temp) {
	
	App.module("Step1.Layout", function(Layout,App,Backbone, Marionette, $, _) {
		
		Layout.Step1LoginRegion = Marionette.Region.extend({
			el : "#loginSection",
			initialize : function() {
				//console.info('Initialize checkout steps region');
				// this.viewLanguage= new LanguageLayout.Layout();
			},
			onShow : function(view) {
				//console.log("steps view shown");
				// this.listenTo(view, "itemview:menu:navigate",
				// this.displayMessage);
			},
			displayMessage : function(id) {
				console.log('regionManager received display:message');
			}
		});
		
		Layout.Step1RegisterRegion = Marionette.Region.extend({
			el : "#registerSection",
			initialize : function() {
				//console.info('Initialize checkout steps region');
				// this.viewLanguage= new LanguageLayout.Layout();
			},
			onShow : function(view) {
				//console.log("steps view shown");
				// this.listenTo(view, "itemview:menu:navigate",
				// this.displayMessage);
			},
			displayMessage : function(id) {
				console.log('regionManager received display:message');
			}
		});
		
        Layout.MainLayout = Marionette.Layout.extend({
			
			tagName : 'div',
			/* id attribute for the auto-generated container element */
			id : 'checkout_main',

			template : TemplateManager.getTemplate(Step1Template),
			regions : {
				step1LoginRegion :   Layout.Step1LoginRegion,
				step1RegisterRegion : Layout.Step1RegisterRegion,
			},
            initialize : function() {
            
			},
			onRender : function() {
				
				
			},
			onShow : function() {
				
				this.step1LoginRegion.show(new Step1Login.LoginContent());
				//this.step1RegisterRegion.show(new Step1Register.RegisterContent());
			
			}
		});
		
	
		
		Layout.Content = Marionette.ItemView.extend({
			//el : "#stepcontent",
			//template:TemplateManager.getTemplate(Step1Template),
			className:'div-lelft',
			tagName:'div',
			index:1,
			initialize:function(){},
			render: function() {
				
				var self = this;
				if (this.index == 1) {
				// Render Step 1
					this.$el.html("HE");
				    this.renderStep1();
				} else {
				// Render Step 2
				   this.renderStep2();
				}
				
				return this;
			},
			renderStep1: function () {
				alert("contentdddddddddd1");
				var self = this;
				//var compiledHtml = TemplateManager.getTemplate(self.hello);// _.template(self.hello, {});
				var compiledHtml= _.template(Step1Template);
				this.$el.html(compiledHtml);
				//this.template=TemplateManager.getTemplate(Step1Template);
			},renderStep2:function(){
				
			}	
		
			
		});
		
	});
	
	return App.Step1.Layout;
	
});