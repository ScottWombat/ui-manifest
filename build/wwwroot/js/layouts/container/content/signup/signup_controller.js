define([ "application", "layouts/container/content/signup/signup_view",'commons/custom'], function(
		App, View) {

	App.module("SignupApp.Signup", function(Signup, App, Backbone,Marionette, $, _) {
		Signup.Controller = {
			model:'',
			showSignup : function(model) {
				
				var view = new View.Form({model:model});
				view.render();
				view.on("form:submit", function(data) {
					$.ajax({
						url : REST_URL + 'user/createUser',
						crossDomain : true,
						type : 'POST',
						data : data,
						success : function(data) {
							console.log([ "Signup request details: ", data ]);

							if (data.error) { // If there is an error, show
									// the error messages
								$('.alert-error').text(data.error.text).show();
							} else { 
								
								//model.set({
									//loggedIn : data.loggedIn
									
								//});
								//model.set({
								
									//loginMsg : data.loginMsg
								//});
								
							}
						},
						error: function (error) {
							
			                  alert('Signup Error: ' + eval(error));
			             },
						beforeSend : function(xhr) {
							//xhr.setRequestHeader("accept", "text/html");
							xhr.setRequestHeader("accept", "application/json");
							xhr.setRequestHeader("Content-Type","application/json");
						}
					});
					
				});
				
			}
		}
	});

	return App.SignupApp.Signup.Controller;

	

});