define([ "application", "layouts/container/content/login/login_view",'commons/ui/modalView','bootstrap','jquery-validate'], function(
		App, View,ModalView) {

	App.module("LoginApp.Login", function(Login, App, Backbone,Marionette, $, _) {
		Login.Controller = {
			model:'',
			showLogin : function(model) {
				
				var view = new View.Form({model:model});
				view.render();
				view.on("form:submit", function(data) {
					$.ajax({
						url : REST_URL + 'user/login',
						crossDomain : true,
						type : 'POST',
						data : data,
						success : function(data) {
							console.log([ "Login request details1: ", data ]);

							if (data.error) { // If there is an error, show
									// the error messages
								
								$('.alert-error').text(data.error.text).show();
							} else { 
								
								model.set({
									loggedIn : data.loggedIn
									
								});
								model.set({
								
									loginMsg : data.loginMsg
								});
								
							}
						},
						error: function (error) {
			                  alert('error; ' + eval(error));
			             },
						beforeSend : function(xhr) {
							//xhr.setRequestHeader("accept", "text/html");
							xhr.setRequestHeader("accept", "application/json");
							xhr.setRequestHeader("Content-Type","application/json");
						}
					});
					
				});
				view.on("form:forgotPassword",function(data){
					
					$.ajax({
						url : REST_URL + 'user/reset/password',
						// url: REST_URL + 'user/authenticate',
						crossDomain : true,
						type : 'POST',
						data : data,
						success : function(data) {
							console.log([ "Login request details: ", data ]);

							if (data.error) { // If there is an error, show
									// the error messages
								$('.alert-error').text(data.error.text).show();
							} else { 
								
								view.model.set({
									loggedIn : data.loggedIn
									
								});
								view.model.set({
								
									loginMsg : data.loginMsg
								});
								
							}
						},
						error: function (error) {
			                  alert('error; ' + eval(error));
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

	return App.LoginApp.Login.Controller;

	

});