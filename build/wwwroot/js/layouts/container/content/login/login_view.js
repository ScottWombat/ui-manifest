define(["application",'utils/templateManager',
        'text!layouts/container/content/login/templates/loginform_template.html',
        'commons/ui/modalView','backbone.syphon','bootstrap','jquery-validate'
       ], 
		function(App,TemplateManager,tpl,ModalView){
	App.module("LoginApp.Common.Views", function(Views, App, Backbone, Marionette, $, _){
	    Views.Form = Marionette.ItemView.extend({
	    	
	    	template: TemplateManager.getTemplate(tpl),
	    	title : 'Login',
	      
	    	initialize:function(options){
	    		this.model = options.model;
	    		//console.info(options.model);
	    		ModalView.Modal.apply(this);
	    		
	    		
	    	},
	    	events: {
	    		"click button.js-submit": "submitClicked",
	    		"click button.js-cancel": "cancelClicked",
	    		"click button.js-forgot-submit": "submitPwdClicked"
	    	},
	    	submitClicked: function(e){
	    		e.preventDefault();
	    		
	    		var data = Backbone.Syphon.serialize(this);
	    		
	    		var jsondata = JSON.stringify(data);
	    		
	    		this.trigger("form:submit", jsondata);
	    		
	    		this.hideModal();
	    	},
	    	cancelClicked:function(e){
	    		e.preventDefault();
	    		App.navigate("#");
	    		this.hideModal();
	    	},
	    	submitPwdClicked:function(e){
	    		e.preventDefault();
	    		//alert(this.model);
	    		var data = Backbone.Syphon.serialize($("#forgot_password")[0]);
	    		
	    		//console.info(data);
	    		var jsondata = JSON.stringify(data);

	    	//	App.trigger("trigger:forgotPassword", jsondata);
	    		this.trigger("form:forgotPassword",jsondata)
	    		this.hideModal();
	    		
	    	}
	    });
	    
	   
	 });
	  return App.LoginApp.Common.Views;
	/*
	 * return { loginItemView: Marionette.ItemView.extend({ template:
	 * TemplateManager.load(LOGIN_TEMPLATE), title: "Login", //className: 'modal
	 * hide' events: { "click button.js-submit": "submitClicked" },
	 * 
	 * submitClicked: function(e){ e.preventDefault(); var data =
	 * Backbone.Syphon.serialize(this); this.trigger("form:submit", data); }, }) };
	 */
});
