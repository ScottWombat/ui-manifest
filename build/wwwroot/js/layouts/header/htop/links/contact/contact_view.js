define([ "application",'handlebars' ,
         'utils/templateManager',
         'text!layouts/header/htop/links/contact/templates/contact_template.html'
         ], function(App,HandleBars,TemplateManager,tpl) {
	
	App.module("Contact.View", function(View,App,Backbone, Marionette, $, _) {
				
		View.Contact = Marionette.ItemView.extend({
			template:TemplateManager.getTemplate(tpl),
			tagname:'div',
			events : {
				"click a.signupLink" : "navigateToSignup"
				
			},
			navigateToSignup : function(e) {
				e.preventDefault();
				this.trigger("signuplink_clicked");
				var data = {'id':'ddd'};
				
				$.ajax({
					url : REST_URL + 'user/login1' +'?callback=jsonCallback',
					type : 'POST',
					crossDomain : true,
					dataType: "json",
					data : JSON.stringify(data),
					 processData: false,
			            xhrFields: {
			                withCredentials: true
			            }
				    })
				    .done(function(response) {
						 alert( "success" );
					})
					.fail(function(req, status, error) {
						//console.info(s);
						 alert( "error:" + req.responseText);
						 })
					.always(function() {
						 alert( "complete" );
						
					
		             });
			  
				
			}
		
		});
	});
	
	return App.Contact.View;
	
});