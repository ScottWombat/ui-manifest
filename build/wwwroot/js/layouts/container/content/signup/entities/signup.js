define(["application",'localstorage'], function(App){
	App.module("Entities", function(Entities, App, Backbone, Marionette, $, _){
		Entities.Signup = Backbone.Model.extend({
			defaults : {
				 username 			: '',
				 password 			: '',
				 state    			: notAuthState,  
				 stateDetails		: ''
				 notAuthState		: 'Not Authenticated',
				 pendingAuthState	: 'Pending Authentication',
				 authSuccessState	: 'Authentication Success',
				 authFailState		:  'Authentication Failure',
				 authUnknownState	: 'Authentication Unknown'
     
			},	
			initialize: function(){}
        
		});
	});
});