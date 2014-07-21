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
        
        Layout.WizardViews = Marionette.Controller.extend({
        	  node:function(){
        		  var _next = null; //reference next node
                  var _previous = null; //reference previus node
                  var _view = view.ref; //referce current view
                  var _tab = view.tab;
                  return {
                      setPrevious: function (node) { _previous = node; return this; }, //chainable!
                      getPrevious: function () { return _previous; },
                      setNext: function (node) { _next = node; return this; }, //chainable!
                      getNext: function () { return _next; },
                      getView: function () { return _view; },
                      getTab: function () { return _tab; }
                  };
        	  },
        	  _head :null,
              _tail : null,
              _current : null,
              first: function(){
            	  return _head;
              },
              last:function(){
            	  return _tail; 
              },
              moveNext: function () {
                  return (_current !== null) ? _current = _current.getNext() : null;
              }, //set current to next and return current or return null
              movePrevious: function () {
                  return (_current !== null) ? _current = _current.getPrevious() : null;
              }, //set current to previous and return current or return null
              getCurrent: function () { return _current; },
              insertView: function (view) {
                  if (_tail === null) { // list is empty (implied head is null)                    
                      _current = _tail = _head = new Node(view);
                  }
                  else {//list has nodes                    
                      _tail = _tail.setNext(new Node(view).setPrevious(_tail)).getNext();
                  }
              },
              setCurrentByTab: function (tab) {
                  var node = _head;
                  while (node !== null) {
                      if (node.getTab() !== tab) { node = node.getNext(); }
                      else { _current = node; break; }
                  }
              }
        	  
          
        })
		
		/**** work ****/
        Layout.CheckoutInfo = Backbone.Model.extend({
        	
        });
        Layout.StepStatus = Backbone.Model.extend({});
        
		Layout.Content = Marionette.ItemView.extend({
		    stepstatus : new Layout.StepStatus(),
		    checkoutInfo : new Layout.CheckoutInfo(),
		    model: new Backbone.Model({loggedIn:false}),
			className:'div-lelft',
			tagName:'div',
			index:1,
			template:this.template=TemplateManager.getTemplate(Step6Template),
			initialize:function(options){
				this.steps = options.steps;
				
				//this.currentIndex =index;
				//_user = new Layout.User();
				//this.wizard = new Layout.WizardViews(_user),
				//this.wizard.insertView({ref:new NameView({model:_user}),tab:'Update Name'});
			},
			events: {
				'click #button-login' : 'clickOnGotoStep2',
				'click #button-payment-address' : 'clickOnGotoStep3',
				'click #button-shipping-details' : 'clickOnGotoStep4',
				'click #button-shipping-method' : 'clickOnGotoStep5',
				'click #button-payment-method' : 'clickOnGotoStep6',
				'click #button-order-summary' : 'clickOnGotoStep7',
				
				'click #previous-confirm' : 'clickOnGotoStep6',
				'click #previous-order-summary' : 'clickOnGotoStep5',
				'click #prvious-payment-method' : 'clickOnGotoStep4',
				'click #previous-shipping-method' : 'clickOnGotoStep3',
				'click #prvious-shipping-deatils' : 'clickOnGotoStep2'
				
				
			},
		
			render: function() {
				if (this.index == 1) {
				    this.renderStep1();
				}else if(this.index ==2){
					this.renderStep2();
				}else if(this.index ==3){
				   this.renderStep3();
				}else if(this.index ==4){
				   this.renderStep4();
				}else if(this.index ==5){
					   this.renderStep5();
				}else if(this.index ==5){
					   this.renderStep5();
				}else if(this.index ==6){
					   this.renderStep6();
				}else if(this.index ==7){
					   this.renderStep7();
				}

				
				//return this;
			},
			
			renderStep1: function () {
				var compiledHtml1= _.template(Step1Template);
				//this.$el.html(compiledHtml1);
				var $bac = $('#step1');
				var step1Status = this.stepstatus.get('step1Status');
				if(step1Status == null){
					$bac.addClass('active-step');
				}
			
				
			},renderStep2:function(){
				 var that = this;
				 require(['text!layouts/container/content/checkout/content/step1/templates/step2_template.html'], function(Step2Template){
					 var compiledHtml2= _.template(Step2Template);
		             that.$el.html(compiledHtml2);
				 });
				 this.stepstatus.set('step1Status','complete-step');
				 this.stepstatus.set('step2Status','active-step');
				 
				 var $bac1 = $('#step1');
				 $bac1.removeClass('active-step');
				 $bac1.addClass('completed-step');
				                
				 var $bac2= $('#step2');
				 $bac2.addClass('active-step');
				 
				 var step3Status = this.stepstatus.get('step3Status');
				 if(step3Status=='active-step'){
					 var $bac3= $('#step3');
					 $bac3.removeClass('active-step');
					 $bac3.addClass('completed-step');
				 }
				 

			},
			renderStep3:function(){
				var compiledHtml3= _.template(Step3Template);
				this.$el.html(compiledHtml3);
				
				 this.stepstatus.set('step2Status','complete-step');
				 this.stepstatus.set('step3Status','active-step');
				
				 var $bac2 = $('#step2');
				 $bac2.removeClass('active-step');
				 $bac2.addClass('completed-step');
				                
				 var $bac3= $('#step3');
				 $bac3.addClass('active-step');
				 
				 var step4Status = this.stepstatus.get('step4Status');
				 if(step4Status=='active-step'){
					 var $bac4= $('#step4');
					 $bac4.removeClass('active-step');
					 $bac4.addClass('completed-step');
				 }
				
			},
			renderStep4:function(){
				var compiledHtml4= _.template(Step4Template);
				this.$el.html(compiledHtml4);
				
				 this.stepstatus.set('step3Status','complete-step');
				 this.stepstatus.set('step4Status','active-step');
				
				 var $bac3 = $('#step3');
				 $bac3.removeClass('active-step');
				 $bac3.addClass('completed-step');
				                
				 var $bac4= $('#step4');
				 $bac4.addClass('active-step');
				 
				 var step5Status = this.stepstatus.get('step5Status');
				 if(step5Status=='active-step'){
					 var $bac5= $('#step5');
					 $bac5.removeClass('active-step');
					 $bac5.addClass('completed-step');
				 }
				
			},
			renderStep5:function(){
				var compiledHtml5= _.template(Step5Template);
				this.$el.html(compiledHtml5);
				
				 this.stepstatus.set('step4Status','complete-step');
				 this.stepstatus.set('step5Status','active-step');
				
				 var $bac4 = $('#step4');
				 $bac4.removeClass('active-step');
				 $bac4.addClass('completed-step');
				                
				 var $bac5= $('#step5');
				 $bac5.addClass('active-step');
				 
				 var step6Status = this.stepstatus.get('step6Status');
				 if(step6Status=='active-step'){
					 var $bac6= $('#step6');
					 $bac6.removeClass('active-step');
					 $bac6.addClass('completed-step');
				 }
				
			},
			renderStep6:function(){
				 var compiledHtml6= _.template(Step6Template,this.checkoutInfo);
				// this.$el.html(compiledHtml6);
				 this.template=this.template=TemplateManager.getTemplate(Step6Template),
				//this.template=TemplateManager.getTemplate(Step6Template),
				
				 this.stepstatus.set('step5Status','complete-step');
				 this.stepstatus.set('step6Status','active-step');
				
				 var $bac5 = $('#step5');
				 $bac5.removeClass('active-step');
				 $bac5.addClass('completed-step');
				                
				 var $bac6= $('#step6');
				 $bac6.addClass('active-step');
				 
				 
				 var step7Status = this.stepstatus.get('step7Status');
				 if(step7Status=='active-step'){
					 var $bac7= $('#step7');
					 $bac7.removeClass('active-step');
					 $bac7.addClass('completed-step');
				 }
				
				
			},
			renderStep7:function(){
				var compiledHtml7= _.template(Step7Template);
				this.$el.html(compiledHtml7);
				
				 this.stepstatus.set('step6Status','complete-step');
				
				 var $bac6 = $('#step6');
				 $bac6.removeClass('active-step');
				 $bac6.addClass('completed-step');
				                
				 var $bac7= $('#step7');
				 $bac7.addClass('active-step');
				 
				 this.stepstatus.set('step7Status','active-step');
				
			},
		
			clickOnGotoStep1: function(e) {
				e.preventDefault();
				this.index = 1;
				this.render();
			},	 
			clickOnGotoStep2: function(e) {
				e.preventDefault();
				var userData = Backbone.Syphon.serialize(this);
				this.checkoutInfo.user=userData;
				this.index = 2;
				this.render();
			},
			clickOnGotoStep3: function(e) {
				e.preventDefault();
				var billingData = Backbone.Syphon.serialize(this);
				this.checkoutInfo.billingdetails=billingData;
				this.index = 3;
				this.render();
			},
			clickOnGotoStep4: function(e) {
				e.preventDefault();
				var shippingDetailsData = Backbone.Syphon.serialize(this);
				this.checkoutInfo.shippingdetails=shippingDetailsData;
				this.index = 4;
				this.render();
			},
			clickOnGotoStep5: function(e) {
				e.preventDefault();
				var shippingMethodData = Backbone.Syphon.serialize(this);
				this.checkoutInfo.shippingMethod=shippingMethodData;
				this.index = 5;
				this.render();
			},
			clickOnGotoStep6: function(e) {
				var paymentMethodData = Backbone.Syphon.serialize(this);
				this.checkoutInfo.paymentMethod=paymentMethodData;
				this.model.test='test';
				console.info(this.model);
				e.preventDefault();
				this.index = 6;
				this.render();
			},
			clickOnGotoStep7: function(e) {
				e.preventDefault();
				this.index = 7;
				this.render();
			},
			onShow:function(){
				// this.$el.slideDown(1800);
				//alert('dd');
			}
		
			
		});
		
	});
	
	return App.Step1.Layout;
	
});