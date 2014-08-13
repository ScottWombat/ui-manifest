define( function( require ) {
	 var Handlebars = require('handlebars');
	 var Marionette = require('marionette');
	 var text = require('text');
	 
	
	 
	 Backbone.Marionette.TemplateCache.loadTemplate = function(templateId){
		 var myTemplate = _compiled(templateId);
		 return myTemplate;
	 };
	 var _compiled = function(tpl, context) {
			var compiled = Handlebars.compile(tpl);
			return context ? compiled(context) : compiled;
	 };
	 
	 var load = function(rawTemplate){
		 var template = Backbone.Marionette.TemplateCache.loadTemplate(rawTemplate);
		 return template; 
	 };
	 
	
	 return{
		 getTemplate:function(template){
			    
				 return load(template);
		}
	 }
	 
	 
	 Handlebars.registerHelper('ifequal', function(lvalue, rvalue, options) {
	    	
	        if (arguments.length < 2)
	            throw new Error("Handlebars Helper equal needs 2 parameters");
	        if( lvalue!=rvalue ) {
	            return options.inverse(this);
	        } else {
	            return options.fn(this);
	        }
	    });
	 
	 
});
