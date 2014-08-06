define([ 'application','socketio/socket',
         'utils/templateManager',
         'text!layouts/container/content/checkout/steps/templates/step1_template.html',
         'backbone.syphon',
         'layouts/container/content/checkout/steps/entities/user'

         ], function(App,Socket,TemplateManager,Step1Template) {
	
	App.module("Step1.Layout", function(Layout,App,Backbone, Marionette, $, _,Q) {
		
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
        
       
		/**** work ****/
        Layout.CheckoutInfo = Backbone.Model.extend({
        	initialize: function(options){
        		
        	},
        	 validate: function(attrs) {
        		 var errors = [];
        		 
        		 if (!attrs.email) {
        		 errors.push({name: 'email', message: 'Please fill email field.'});
        		 }
        		 if (!attrs.pwd ){
        		 errors.push({name: 'pwd', message: 'Please fill password field.'});
        		 }
        		  
        		 return errors.length > 0 ? errors : false;
	        	
	        	 // var errors ={};
	        	  //return 'email is required';
	        	 // errors.email = 'Email is requiredq';
	        	 // this.errors = errors;
	        	  //return errors;
	          }
        });
        Layout.StepStatus = Backbone.Model.extend({});
        
		Layout.Content = Marionette.ItemView.extend({
		    stepstatus : new Layout.StepStatus(),
		    //checkoutInfo : new Layout.CheckoutInfo(),
		    //model: new Backbone.Model({loggedIn:false}),
		   // model: new Layout.CheckoutInfo(),
			className:'div-lelft',
			tagName:'div',
			//index:1,
			initialize:function(options){
				this.steps = options.steps;
				this.index=1;
			},
			getTemplate:function(){
			       var template =require('text!layouts/container/content/checkout/steps/templates/step'+ this.index +'_template.html');
			       return TemplateManager.getTemplate(template);
				   
			},
			
			showError :function(model, errors, options){
				console.info('showError');
				console.info(model);
				console.info(errors);
				console.info(options);
				$a_email =$('#a_email');
				console.info($a_email);
				$a_email.addClass('required');
				$a_email.html('&nbsp;*&nbsp;');
				$('error_email').html(errors);
				$('#email').focus();
			},
			
			events: {
				'click #button-login' : 'doLogin',
				'click #button-register': 'doRegister',
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
			 modelEvents: {
                 "invalid": "showError"  //trigger from model validate function 

             },
        
			onRender :function(){
				this.renderStep();
				/*
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
				*/
			},
			renderStep:function(){
				
				if(this.index == 1){
					this.renderStep1();
				}else if(this.index ==7){
					this.renderStep7();
				}else{
					this.renderElseStep();
				}
			},
			renderElseStep: function(){
				 var previous = this.index - 1;
				 var current = this.index;
				 var next     = this.index + 1;
				 this.stepstatus.set('step' + previous + 'Status','complete-step');
				 this.stepstatus.set('step' + current + 'Status','active-step');
				 
				 var $prev = $('#step' + previous);
				 $prev.removeClass('active-step');
				 $prev.addClass('completed-step');
				                
				 var $curr= $('#step' + current);
				 $curr.addClass('active-step');
				 
				 var stepStatus = this.stepstatus.get('step' + next +'Status');
				 if(stepStatus=='active-step'){
					 var $next= $('#step'+ next);
					 $next.removeClass('active-step');
					 $next.addClass('completed-step');
				 }
			},
			renderStep1: function () {
				//var compiledHtml1= _.template(Step1Template);
				//this.$el.html(compiledHtml1);
				//var $bac = $('#step1');
				var $bac = $('#step'+this.index);
				var step1Status = this.stepstatus.get('step1Status');
				if(step1Status == null){
					$bac.addClass('active-step');
				}
			
			    //this.index=2;
				
			},
			/*
			renderStep2:function(){
				 //var that = this;
				// require(['text!layouts/container/content/checkout/content/step1/templates/step2_template.html'], function(Step2Template){
				//	 var compiledHtml2= _.template(Step2Template);
		        //     that.$el.html(compiledHtml2);
				// });
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
				 
				 //this.index=3;
			},
			renderStep3:function(){
				//var compiledHtml3= _.template(Step3Template);
				//this.$el.html(compiledHtml3);
				
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
				//this.index=4;
			},
			renderStep4:function(){
				//var compiledHtml4= _.template(Step4Template);
				//this.$el.html(compiledHtml4);
				
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
				// this.index=5;
				
			},
			renderStep5:function(){
				//var compiledHtml5= _.template(Step5Template);
				//this.$el.html(compiledHtml5);
				
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
				 //this.index=6;
				
			},
			renderStep6:function(){
				// var compiledHtml6= _.template(Step6Template,this.checkoutInfo);
				// this.$el.html(compiledHtml6);
				 //this.template=TemplateManager.getTemplate(Step6Template),
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
				
				//this.index=7;
				
			},
			*/
			renderStep7:function(){
				//var compiledHtml7= _.template(Step7Template);
				//this.$el.html(compiledHtml7);
				
				 this.stepstatus.set('step6Status','complete-step');
				
				 var $bac6 = $('#step6');
				 $bac6.removeClass('active-step');
				 $bac6.addClass('completed-step');
				                
				 var $bac7= $('#step7');
				 $bac7.addClass('active-step');
				 
				 this.stepstatus.set('step7Status','active-step');
				 //this.index=6;
			},
		
			clickOnGotoStep1: function(e) {
				e.preventDefault();		
				
				this.render();
				$('#email').focus();
			},	 
			gotoStep2: function() {
				//e.preventDefault();
				   var template =require('text!layouts/container/content/checkout/steps/templates/step'+ this.index +'_template.html');
			       this.template = TemplateManager.getTemplate(template);
				
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
				//var shippingMethodData = Backbone.Syphon.serialize(this);
				//this.checkoutInfo.shippingMethod=shippingMethodData;
				this.index = 5;
				this.render();
			},
			clickOnGotoStep6: function(e) {
				//var paymentMethodData = Backbone.Syphon.serialize(this);
				//this.checkoutInfo.paymentMethod=paymentMethodData;
				//this.model.test='test';
				//console.info(this.model);
				e.preventDefault();
				this.index = 6;
				this.render();
			},
			clickOnGotoStep7: function(e) {
				e.preventDefault();
				this.index = 7;
				this.render();
			},
			
			doLogin:function(e){
				e.preventDefault();
				//var q = require('q');
				this.clearErrors();
				var loginData = Backbone.Syphon.serialize(this);
				
				var io =Socket.createConnection();
				io.emit('user:login', loginData);
				io.on('message', function (data) {
					alert(data);
				});
			
				var loginerrors = this.validateUserEnter(loginData);
				
				if(loginerrors.length > 0){
				    this.showErrors(errors);

				}else{
				  var ret =	App.request("checkout:login",loginData)
				  console.info("RETURN:" +ret);
					  //var data =JSON.stringify(response)
		        	  // var json = JSON.parse(data);
		        	 //  console.info(cart1);
				   //})
				   if(ret)
				      this.gotoStep2();
			   }
		
			},
			doRegister:function(e){
				e.preventDefault();
				 this.$('#imail').text('');
				this.clearErrors();
				var registerData = Backbone.Syphon.serialize(this);
				var register_errs = this.validateUserRegister(registerData);
				if( register_errs.length > 0){ 
				    this.showErrors(register_errs);

				}else{
				  var ret =	App.request("checkout:login",registerData)
					  //var data =JSON.stringify(response)
		        	  // var json = JSON.parse(data);
		        	 //  console.info(cart1);
				   //})
				   if(ret)
				      this.gotoStep2();
			   }
				
			},
			clearErrors:function(){
				 this.$('.fieldrequired').text('');
			},
			showErrors:function(errors){
				 _.each(errors, function (error) {
					 var asteric = this.$('#' + 'a_' + error.name);
					 asteric.html('&nbsp;*&nbsp;');
					 asteric.addClass('fieldrequired');
					 var message = this.$('#' + 'error_' + error.name);
					 message.addClass('fieldrequired');
					 message.html(error.message);
				
					 }, this);
			},
			validateUserEnter:function(loginData){
				 var errors = [];
				 var emailfilter = /(([a-zA-Z0-9\-?\.?]+)@(([a-zA-Z0-9\-_]+\.)+)([a-z]{2,3}))+$/;
				 if(!loginData.email  && !emailfilter.test(loginData.email)) {
					 errors.push({name: 'email', message: 'Please enter valid email'});
				 }
				 if (!loginData.pwd) {
					 errors.push({name: 'pwd', message: 'Please enter password'});
				 }
				 return errors;
			},
			validateUserRegister:function(registerData){
				 var errors = [];
				 var emailfilter = /(([a-zA-Z0-9\-?\.?]+)@(([a-zA-Z0-9\-_]+\.)+)([a-z]{2,3}))+$/;
				 if(!registerData.emai1  && !emailfilter.test(registerData.email1)) {
					 errors.push({name: 'email1', message: 'Please enter valid email'});
				 }
				 
				 if (!registerData.pwd1) {
					 errors.push({name: 'pwd1', message: 'Please enter password'});
				 }
				 if (!registerData.pwd2) {
					 errors.push({name: 'pwd2', message: 'Please enter confirm password'});
				 }
				 
				 if(registerData.pwd1 != registerData.pwd2){
					 errors.push({name: 'pwd1', message: 'Please enter same password and confirm password'});
				 }
				 
				 
				 
				 return errors;
			}
		
			
		});
		
	});
	
	return App.Step1.Layout;
	
});