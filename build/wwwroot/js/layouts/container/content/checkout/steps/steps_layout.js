define([ 'application','socketio/socket',
         'utils/templateManager',
         'text!layouts/container/content/checkout/steps/templates/step1_template.html',
         'text!layouts/container/content/checkout/steps/templates/step2_template.html',
         'text!layouts/container/content/checkout/steps/templates/step3_template.html',
         'text!layouts/container/content/checkout/steps/templates/step4_template.html',
         'text!layouts/container/content/checkout/steps/templates/step5_template.html',
         'text!layouts/container/content/checkout/steps/templates/step6_template.html',
         'text!layouts/container/content/checkout/steps/templates/step7_template.html',
         'layouts/container/content/checkout/steps/entities/user',
         'layouts/header/hsecond/cart/entities/cart' 

         ], function(App,Socket,TemplateManager,Step1Template,Step2Template,Step3Template,Step4Template,Step5Template,Step6Template,Step7Template,Q1) {
	
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
        
       /*
        defaults:{
        		firstname:'',
        		lastname :'',
        		company  :'',
        		company_id :'',
        		address_1 : '',
        		address_2 :'',
        		city :'',
        		postcode :'',
        		state :'',
        		country:''
        	}
        */
		/**** work ****/
       
        
        
        Layout.StepStatus = Backbone.Model.extend({});
        
        authenticatedKinveySync = function(method, model, options) {
  		  options.type = "POST";
  		 // options.crossDomain = true;
  		  //options.dataType='JSONP';
  		  options.xhrFields = {withCredentials:true};
  		  options.beforeSend = function(jqXHR) {
  			  jqXHR.setRequestHeader("accept", "application/json");
  			  jqXHR.setRequestHeader("Content-Type","application/json");
  			 // jqXHR.setRequestHeader(
  			//		  'Authorization',
  			//		  'Basic ' + $.base64.encode(
  			//				  kinvey_app_key + ':' + kinvey_secret
  				//	  )
  			  //);
  		  }
  		  // Call the default Backbone sync implementation
  		// if (method === 'OPTIONS') options.type = 'POST';
  		  Backbone.sync.call(this, method, model, options);
  	    };
        Layout.UserModel = Backbone.Model.extend({
			initialize: function(options){
			        this.url = options.url;
			        this.data=JSON.stringify(options.data);
			 },
			 async: authenticatedKinveySync,
			 parse: function (response) {
			        return response;
			 }
			  
	   });
        
        Layout.BillingDetails = Backbone.Model.extend({
        	default:{
        		firstname:'revit'
        	}
        });
        Layout.ShippingDetails = Backbone.Model.extend({});
        Layout.ShippingMethod = Backbone.Model.extend({});
        Layout.PaymentMethod = Backbone.Model.extend({});
        Layout.CartInfo       = Backbone.Model.extend({
        	
        });
        
        Layout.Cart = Backbone.Model.extend({
       	 	url: function () {
       	        return REST_URL + "cart/list?callback=jsonCallback";
       	 	}
         });
	  
        Layout.CheckoutInfo = Backbone.Model.extend({
        	
        	initialize: function(){
        		//this.set( "billingDetails", new Layout.BillingDetails());
        	}
        });
        
		Layout.Content = Marionette.ItemView.extend({
		    stepstatus : new Layout.StepStatus(),
		    //checkoutInfo : new Layout.CheckoutInfo(),
		    //model: new Backbone.Model({loggedIn:false}),
		    //checkoutInfo: new Layout.CheckoutInfo(),
		     model :new Layout.CheckoutInfo(),
		    //  model : new Backbone.Model(),
			//className:'div-lelft',
			//tagName:'div',
			//index:1,
			initialize:function(options){
				this.steps = options.steps;
				this.index=1;
				//this.model.set('cartInfo',new Layout.CartInfo());
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
				'click #prvious-payment-method' : 'gotoShippingMethod',
				'click #previous-shipping-method' : 'gotoShippingDetails',
				'click #previous-shipping-details' : 'clickOnGotoStep2'
				
			},
			 modelEvents: {
                 "invalid": "showError"  //trigger from model validate function 

             },
        
			onRender :function(){
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
			},
			renderStep:function(step){
				
			},
			renderStep1: function () {
				//var compiledHtml1= _.template(Step1Template);
				//this.$el.html(compiledHtml1);
				var $bac = $('#step1');
				var step1Status = this.stepstatus.get('step1Status');
				if(step1Status == null){
					$bac.addClass('active-step');
				}
			
			    //this.index=2;
				
			},renderStep2:function(){
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
				// $('#firstname').val(this.checkoutInfo.firstname);
				// $('#lastname').val('dddd');
				// $('#company').val(this.checkoutInfo.company);
				// $('#company_id').val(this.checkoutInfo.company_id);
				/// $('#address_1').val(this.checkoutInfo.address_1);
				// $('#address_2').val(this.checkoutInfo.address_2);
				// $('#city').val(this.checkoutInfo.city);
				// $('#state').val(this.checkoutInfo.state);
				// $('#postcode').val(this.checkoutInfo.postcode);
				// $('#country').val(this.checkoutInfo.country);
				
				 
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
			gotoBillingDetails: function() {
				//e.preventDefault();
				this.index = 2;
				this.render();
			},
			gotoShippingDetails:function(e){
				/*
				var billingDetails = this.model.get('billingDetails')
				billingDetails={firstname : billingDetails.firstname,
					            lastname: billingDetails.lastname,
					            company: billingDetails.company,
							     company_id: billingDetails.company_id,
							     address_1: billingDetails.address_1,
							     address_2: billingDetails.address_2,
							     city: billingDetails.city,
							     postcode: billingDetails.postcode,
							     state: billingDetails.state,
							     country: billingDetails.country
					            
				};
				
				
				this.model.set("billingDetails", billingDetails);
				*/
				this.index = 3;
				this.render();
			},
			gotoShippingMethod:function(e){
				this.index = 4;
				this.render();
			},
			clickOnGotoStep2: function(e) {
				e.preventDefault();
				console.info("Gototstpe2");
				this.index = 2;
				this.render();
			},
			clickOnGotoStep3: function(e) {
				e.preventDefault();
				this.clearErrors();
				var accountDetailData = Backbone.Syphon.serialize(this);
			
				var errors = this.validateBillingDetailsForm(accountDetailData);

				if(errors.length > 0){
					this.showErrors(errors);
				}else{
					//console.info(this.model);
					var billingDetails = this.model.get('billingDetails')
					billingDetails={firstname : accountDetailData.firstname,
						            lastname: accountDetailData.lastname,
						            company: accountDetailData.company,
								     company_id: accountDetailData.company_id,
								     address_1: accountDetailData.address_1,
								     address_2: accountDetailData.address_2,
								     city: accountDetailData.city,
								     postcode: accountDetailData.postcode,
								     state: accountDetailData.state,
								     country: accountDetailData.country
						            
					};
					//billingDetails.set("firstname","rev");
					this.model.set("billingDetails", billingDetails);
					/*
					this.model.set({
					     firstname: accountDetailData.firstname,
					     lastname: accountDetailData.lastname,
					     company: accountDetailData.company,
					     company_id: accountDetailData.company_id,
					     address_1: accountDetailData.address_1,
					     address_2: accountDetailData.address_2,
					     city: accountDetailData.city,
					     postcode: accountDetailData.postcode,
					     state: accountDetailData.state,
					     country: accountDetailData.country
					});
					*/
					this.index = 3;
					this.render();
				}
			},
			clickOnGotoStep4: function(e) {
				e.preventDefault();
				var shippingDetailData = Backbone.Syphon.serialize(this);
				this.clearErrors();
			
				var errors = this.validateBillingDetailsForm(shippingDetailData);
				console.info(this.model);
				if(errors.length > 0){
					this.showErrors(errors);
				}else{
					var shippingDetails = this.model.get('shippingDetails')
					shippingDetails={firstname : shippingDetailData.firstname,
						            lastname: shippingDetailData.lastname,
						            company: shippingDetailData.company,
								     company_id: shippingDetailData.company_id,
								     address_1: shippingDetailData.address_1,
								     address_2: shippingDetailData.address_2,
								     city: shippingDetailData.city,
								     postcode: shippingDetailData.postcode,
								     state: shippingDetailData.state,
								     country: shippingDetailData.country
						            
					};
					
					this.model.set("shippingDetails", shippingDetails);
					//set default shipping method
					var shippingMethod = this.model.get('shippingMethod');
					shippingMethod={
					     shippingMethod: 'free'
					};
					this.model.set("shippingMethod", shippingMethod);
					
					this.index = 4;
					this.render();
				}
			},
			clickOnGotoStep5: function(e) {
				e.preventDefault();
				console.info(this.model);
				
				var shippingMethodData = Backbone.Syphon.serialize(this);
				var shippingMethod = this.model.get('shippingMethod');

				shippingMethod={
				     shippingMethod: shippingMethodData.shipping_method,
				     shippingMethodNote: shippingMethodData.shipping_method_note
				    
				};
				this.model.set("shippingMethod", shippingMethod);
				//set default payment method
				var paymentMethod = this.model.get('paymentMethod');
				paymentMethod={
						paymentType: 'cod',
						agree:'no'
				};
				this.model.set("paymentMethod", paymentMethod);
				
				
				this.index = 5;
				this.render();
			},
			clickOnGotoStep6: function(e) {
				
				e.preventDefault();
				
				var paymentMethodForm = Backbone.Syphon.serialize(this);
				this.clearErrors();
			
				var errors = this.validatePaymentMethodForm(paymentMethodForm);
			
				if(errors.length > 0){
					console.info(errors);
					this.showErrors(errors);
				}else{
					var paymentMethod = this.model.get('paymentMethod');
					paymentMethod={
							paymentType:paymentMethodForm.paymentType,
							comment :paymentMethodForm.comment,
							agree : paymentMethodForm.agree
					};
					this.model.set("paymentMethod", paymentMethod);
					
					
					var cart = new Layout.Cart();
				    var _that = this;
					$.when(cart.fetch())
				      .done(function (cart) {
				    	  var cartInfo = _that.model.get("cartInfo");
				    	  cartInfo={
				    			  products:cart.products,
				    			  subtotal: cart.subtotal,
				    			  total:cart.total
				    			  
				    	  };
				    	 _that.model.set("cartInfo",cartInfo)
				    
				    	 _that.index = 6;
						 _that.render();
				      });
					console.info(this.model);
					
				}
				
			
			},
			clickOnGotoStep7: function(e) {
				e.preventDefault();
				//var cartCollection = App.request("cart:entities");
				console.info(this.model);
				this.index = 7;
				this.render();
			},
			
			doLogin:function(e){
				e.preventDefault();
								
				this.clearErrors();
				var loginData = Backbone.Syphon.serialize(this);
				
				var loginerrors = this.validateUserLogin(loginData);
				
				if(loginerrors.length > 0){
				    this.showErrors(errors);

				}else{
					var url = "/logon";
				    var data = JSON.stringify(loginData)
				    console.info(data);
				    Layout.Login = new Layout.UserModel({url:url,data:loginData});
				   // var ret = Layout.Login.save({});
				    var self = this;
				    var d = Layout.Login.save({})
	    	          			.done(function(response) {
	    	          				var token =response.token;
				    				var io =Socket.createConnection(token);
					
				    				io.emit('user:login', loginData);
					
				    				io.on('message', function (data) {
				    					//alert(data);
				    					self.gotoBillingDetails();
				    				});
	    	          				
	    	          			})
	    	          			.fail(function(err) {
	    	          			    var data = JSON.stringify(err)
	    	  				        console.info(data);
	    	          			    var $loginMsg = $('#loginMsg');
	    	          			    $loginMsg.html('* Invalid email or password');
	    	          			    $loginMsg.addClass('fieldrequired');
	    	          				console.info("Error!" + response);
	    	          			});
				}
				
			},
			doRegister:function(e){
				e.preventDefault();
				this.clearErrors();
				var registerData = Backbone.Syphon.serialize(this);
				var register_errs = this.validateUserRegister(registerData);
				if( register_errs.length > 0){ 
				    this.showErrors(register_errs);

				}else{
					var url = "/register";
				    Layout.Register = new Layout.UserModel({url:url,data:registerData});
				   // var ret = Layout.Login.save({});
				    var self = this;
				    var d = Layout.Register.save({})
	    	          			.done(function(response) {
	    	          				console.info("register");
	    	          				console.info(response.token);
	    	          				var token =response.token;
				    				var io =Socket.createConnection(token);
					
				    				io.emit('user:register', registerData);
					
				    				io.on('message', function (data) {
				    					//alert(data);
				    					self.gotoStep2();
				    				});
	    	          				self.gotoStep2()
	    	          			})
	    	          			.fail(function(err) {
	    	          			    var data = JSON.stringify(err)
	    	  				        console.info(data);
	    	          			    var $loginMsg = $('#registerMsg');
	    	          			    $loginMsg.html('* Invalid email or password');
	    	          			    $loginMsg.addClass('fieldrequired');
	    	          				console.info("Error!" + response);
	    	          			});
				
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
			validateUserLogin:function(loginData){
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
			},
			validateBillingDetailsForm:function(form){
				var regPostcode_temp = /^([N][S][W]|[A][C][T]|[V][I][C]|[Q][L][D]|[S][A]|[W][A]|[T][A][S]|[N][T])([ ])([0-9]{4})$/;
				
				 var errors = [];
				 if (!form.firstname) {
					 errors.push({name: 'firstname', message: 'Please enter first name'});
				 }
				 if (!form.lastname) {
					 errors.push({name: 'lastname', message: 'Please enter last name'});
				 }
				 if (!form.address_1) {
					 errors.push({name: 'address_1', message: 'Please enter address'});
				 }
				 if (!form.city) {
					 errors.push({name: 'city', message: 'Please enter city'});
				 }
				 if (!form.postcode) {
					 errors.push({name: 'postcode', message: 'Please enter postcode'});
				 }
				 
				 if (form.state=='Please Select') {
					 errors.push({name: 'state', message: 'Please enter state'});
				 }else{
					 
					 var map = {'NSW' : /^([2][0-9]{3})$/,
							    'VIC' : /^([3][0-9]{3})$/,
							    'ACT' : /^([2][0-9]{3})$/,
							    'QLD' : /^([4][0-9]{3})$/,
							    'SA'  : /^([5][0-9]{3})$/,
							    'WA'  : /^([6][0-9]{3})$/,
							    'TAS' : /^([7][0-9]{3})$/,
							    'NT'  : /^([8][0-9]{3})$/
						 };
					
					  var regPostcode = map[form.state];
					 if(regPostcode.test(form.postcode)==false){
						errors.push({name: 'postcode', message: 'Please enter valid ' + form.state +' postcode'});
					 }

				 }
				 return errors;
			},
			validatePaymentMethodForm:function(form){
				 var errors = [];
				 if (!form.agree) {
					 errors.push({name: 'agree', message: 'Please accept term & conditions'});
				 }
				 return errors;
			}
			
		});
		
	});
	
	return App.Step1.Layout;
	
});