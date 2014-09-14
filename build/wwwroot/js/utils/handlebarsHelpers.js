define(['handlebars','i18next'], function (Handlebars,i18next) {
    //function addOn(context, options) {
    //    console.log(options.hash);
    //}
//return new Handlebars.SafeString("<img src='" + src + "' title='" + groupName +  "' class='" + cssClass + "'/>");
	
	//Handlebars.registerHelper('t1', function(i18n_key) {
	//	  var result = i18n.t(i18n_key);
		 
	//	  return new Handlebars.SafeString(result);
	//});
	
	Handlebars.registerHelper("i18n_e", function(options) {
		//console.info("DDDDDDDDDDDD");
		//console.info(options);
		//if (key === undefined){
			//key = defautname;
		//}
		//return i18next.t(key,options.hash);
		 var key = options.hash.key;
		 var defaultname = options.hash.defaultname;
		 console.info(key +":" + defaultname);
		 var result = i18next.t(defaultname,options.hash);
		 console.info(result);
		 return "result";
	});
	
	Handlebars.registerHelper("i18n", function(key,options) {
		console.info("i18n" + key);
		//console.info(options);
		//if (key === undefined){
			//key = defautname;
		//}
		return i18next.t(key,options.hash);
	});
	
	Handlebars.registerHelper('first', function(catalogueName,pageSize,channel, options) {
		
		var first=1;
		return new Handlebars.SafeString("<a class='" +channel + "' id='" + catalogueName + "/" + first + "/" + pageSize + "/" + channel +"'>" + '|<<' +"</a>");
	}); 
	
	Handlebars.registerHelper('previous', function(current,catalogueName,pageSize, channel,options) {
		var previous= current - 1;
		return new Handlebars.SafeString("<a class='" + channel +"' id='" + catalogueName + "/" + previous + "/" + pageSize + "/" + channel +"'>" + "<" +"</a>");
	});
	
	Handlebars.registerHelper('next', function(current,catalogueName,pageSize,channel, options) {
		var next= current + 1;
		return new Handlebars.SafeString("<a class='" + channel +"' id='" + catalogueName + "/" + next + "/" + pageSize + "/" + channel +"'>" + ">" +"</a>");
	});
	
	Handlebars.registerHelper('last', function(numberOfPages,catalogueName,pageSize,channel, options) {
		var last=numberOfPages;
		return new Handlebars.SafeString("<a class='" + channel +"' id='" + catalogueName + "/" + last + "/" + pageSize + "/" + channel +"'>" + '>>|' +"</a>");
	});
	
	Handlebars.registerHelper('times', function(n,current,catalogueName,pageSize,channel, options) {
	    var accum = '';
	    for(var i = 1; i < n+1; ++i){
	    	 //accum += options.fn(i+1);
	    	//console.info(i +":" + current);
	    	if(i==current){
	    		accum +=new Handlebars.SafeString("<b>" + i +"</b>");
	    	}else{
	    		accum +=new Handlebars.SafeString("<a class='" + channel + "' id='" + catalogueName + "/" + i + "/" + pageSize + "/" + channel +"'>" + i +"</a>");
	    	}
	    }
	       
	    return accum;
	});
	
    Handlebars.registerHelper('equal', function(lvalue, rvalue, options) {
    	
        if (arguments.length < 3)
            throw new Error("Handlebars Helper equal needs 2 parameters");
        if( lvalue!=rvalue ) {
            return options.inverse(this);
        } else {
            return options.fn(this);
        }
    });
    
    Handlebars.registerHelper('compare', function (lvalue, operator, rvalue, options) {

        var operators, result;
        
        if (arguments.length < 3) {
            throw new Error("Handlerbars Helper 'compare' needs 2 parameters");
        }
        
        if (options === undefined) {
            options = rvalue;
            rvalue = operator;
            operator = "===";
        }
        
        operators = {
            '==': function (l, r) { return l == r; },
            '===': function (l, r) { return l === r; },
            '!=': function (l, r) { return l != r; },
            '!==': function (l, r) { return l !== r; },
            '<': function (l, r) { return l < r; },
            '>': function (l, r) { return l > r; },
            '<=': function (l, r) { return l <= r; },
            '>=': function (l, r) { return l >= r; },
            'typeof': function (l, r) { return typeof l == r; }
        };
        
        if (!operators[operator]) {
            throw new Error("Handlerbars Helper 'compare' doesn't know the operator " + operator);
        }
        
        result = operators[operator](lvalue, rvalue);
        
        if (result) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }

    });
    function yeller ( context, options ) {
    	 // Assume it's a string for simplicity.
    	return context + "!!!!!!!!";
    }
    function yeller1 ( context, options ) {
   	 // Assume it's a string for simplicity.
   	return context + "!!!!!!!!";
   }
    
    function ifequal(lvalue, rvalue, options) {
    	
    	 if (arguments.length < 3)
             throw new Error("Handlebars Helper ifequal needs 2 parameters");
         if( lvalue!=rvalue ) {
        	
             return options.inverse(this);
         } else {
             return options.fn(this);
         }
   }
    
    function add(lvalue, rvalue, options) {
   	 if (arguments.length < 3)
            throw new Error("Handlebars Helper ifequal needs 2 parameters");
        
     return lvalue * rvalue;
        
  }
    
    Handlebars.registerHelper('ifCond', function(v1, v2, options) {
    	  if(v1 === v2) {
    		 alert='equal';
    	    return options.fn(this);
    	  }
    	  return options.inverse(this);
    	});
    	 
    Handlebars.registerHelper( 'yeller', yeller );
    Handlebars.registerHelper( 'add', add );
  
    Handlebars.registerHelper( 'ifequal', ifequal );
    
    	 return {yeller:yeller,
    		 	ifequal:ifequal,
    		 	add:add
    		 
    	 }
    
   
});