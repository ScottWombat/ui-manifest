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
						//url : REST_URL + 'user1/login?callback=jsonCallback',
						url : '/login3',
						crossDomain : true,
					    contentType: 'application/json',
						type : 'POST',
						data : data,
						success : function(data) {
							console.log([ "Login request details1: ", data ]);

							if (data.error) { // If there is an error, show
								
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
			                  alert('error1; ' + eval(error));
			             },
						beforeSend : function(xhr) {
							//xhr.setRequestHeader("accept", "text/html");
							//xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							xhr.setRequestHeader("accept", "application/json");
							xhr.setRequestHeader("Content-Type","application/json");
							//xhr.setRequestHeader("Content-Type","Access-Control-Allow-Headers");
							// var base = Base64.encode(data.email+ ":" + data.pwd);
					        //    xhr.setRequestHeader("Authorization", "Basic " + base);
						},
						//Handle default error check
				        statusCode: {
				            400 : function(){
				                alert('400 : bad request');
				            },
				            401 : function(){
				                alert('401 : unauthorized');
				            },
				            403 : function(){
				                alert('403 : forbidden');
				            },
				            404 : function(){
				                alert('404 : not found');
				            },
				            415 : function(){
				                alert('415 : type not allowed');
				            },
				            500 : function(){
				                alert('500 : internal server error');
				            }
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