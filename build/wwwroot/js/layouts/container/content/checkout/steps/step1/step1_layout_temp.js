define([ 'application',
         'utils/templateManager',
         'text!layouts/container/content/checkout/content/step1/templates/step1_template.html',
         'text!layouts/container/content/checkout/content/step1/templates/step2_template.html',
         'text!layouts/container/content/checkout/content/step1/templates/step3_template.html',
         'text!layouts/container/content/checkout/content/step1/templates/step4_template.html',
         'text!layouts/container/content/checkout/content/step1/templates/step5_template.html',
         'text!layouts/container/content/checkout/content/step1/templates/step6_template.html',
         'text!layouts/container/content/checkout/content/step1/templates/step7_template.html',
         'backbone.syphon'

         ], function(App,TemplateManager,Step1Template,Step2Template,Step3Template,Step4Template,Step5Template,Step6Template,Step7Template) {
	
	App.module("Step1.Layout", function(Layout,App,Backbone, Marionette, $, _) {
		
		
		
		/**** work ****/
        Layout.CheckoutInfo = Backbone.Model.extend({
        	
        });
        Layout.StepStatus = Backbone.Model.extend({});
        
		Layout.Content = Marionette.ItemView.extend({
		   index:2,
		   getTemplate: function(){
			   if(this.index ==1){
				return TemplateManager.getTemplate(Step6Template);
			   } else{
				   return TemplateManager.getTemplate(Step2Template);
			   }
		   },
			
			//render: function() {
				//alert("onshowd");
				//if (this.index == 1) {
				//	this.template=TemplateManager.getTemplate(Step6Template);
				//}
				//return this;
			//},
			onShow:function(){
				//alert("onshow");
			
			},
			modelEvents: {
		        'change': 'fieldsChanged'
		    },

		    fieldsChanged: function() {
		        this.render();
		    }
		});
	});
	
	return App.Step1.Layout;
	
});