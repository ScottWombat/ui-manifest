define([ 'application',
         'utils/templateManager',
         'text!layouts/container/content/checkout/templates/checkout_template.html',
         'layouts/container/content/checkout/steps/checkout_steps_layout',
         'layouts/container/content/checkout/content/step1/step1_layout',
         //'layouts/container/content/checkout/content/step2/step2_layout'
         ], function(App,TemplateManager,tpl,Steps,Step1) {
	
	App.module("Checkout.Layout", function(Layout,App,Backbone, Marionette, $, _) {
		Layout.StepsRegion = Marionette.Region.extend({
			el : "#steps",
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
		
		
		Layout.ContentRegion = Marionette.Region.extend({
			el : "#stepcontent",
			initialize : function() {
				//console.info('Initialize checkout content region');
				// this.viewLanguage= new LanguageLayout.Layout();
			},
			
			 open: function(view){
				    this.$el.hide();
				    this.$el.html(view.el);
				    this.$el.slideDown(2500);
			 },
			 close:function(view){
				   this.$el.slideUp(2500);
			 }
		});
		
		
		Layout.MainLayout = Marionette.Layout.extend({
			
			tagName : 'div',
			/* id attribute for the auto-generated container element */
			id : 'checkout_main',

			template : TemplateManager.getTemplate(tpl),
			regions : {
				stepsRegion : Layout.StepsRegion,
				contentRegion : Layout.ContentRegion,
			},
            initialize : function() {
            	
				this.viewSteps = new Steps.Steps();
				
				if ( typeof sessionToken === 'undefined'){
					
					this.viewContent = new Step1.Content();
				}else{
					this.viewContent = new Step1.Content();
				}
				
			},
			onRender : function() {
				
				// this.ui.checkbox.addClass('checked');
				//this.stepsRegion.show(this.viewSteps);
				//this.contentRegion.show(this.viewContent);
				//this.contentRegion.show(new Step1.Content());
			},
			onShow : function() {
				
				this.stepsRegion.show(this.viewSteps);
				if ( typeof sessionToken === 'undefined'){
						this.contentRegion.show(new Step1.MainLayout());
				}else{
					//this.contentRegion.show(new Step2.Content());
				}
			
			}
		});
		
		
		
		
	});
	return App.Checkout.Layout;
});