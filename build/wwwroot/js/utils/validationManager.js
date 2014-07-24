define( function( require) {
	require('i18n');
	var _ = require('underscore');
	
	var doValidate=function(model,attrs){
		var _ = require('underscore');
		this.errors = {};
	    this.attributes = _.clone(model.attributes);
	    _.extend(this.attributes, changedAttributes);
	    _.each(model.validates, function(value, rule) {
	      this.validators[rule](value);
	    });

	    this.validators = {
	      required: function(fields) {
	       _.each(fields, function(field) {
	          if(_.isEmpty(this.attributes[field]) === true) {
	            this.addError(field, I18n.t('errors.form.required'));
	          }
	        });
	      }
	    };

	    this.addError = function(field, message) {
	      if (_.isUndefined(this.errors[field])) {
	        this.errors[field] = [];
	      }
	      this.errors[field].push(message);
	    };

	    return this.errors;
	}
	
	return{
		 validate:function(model,attributes){
			    
				 return doValidate(model,attributes);
		}
	 }
	
});










   
 

