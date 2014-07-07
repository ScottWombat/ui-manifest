define(["application",'localstorage'], function(Mystore){
	Mystore.module("Entities", function(Entities, Mystore, Backbone, Marionette, $, _){
		Entities.Login = Backbone.Model.extend({
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