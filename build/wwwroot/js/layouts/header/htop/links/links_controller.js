define(["application", 
        "layouts/header/htop/links/links_layout"], function(App, LinksLayout){
	
  App.module("Links", function(Links, App, Backbone, Marionette, $, _){
	  Links.Controller = {
			  addLayout: function(){
				  var layout = new LinksLayout.LinksLayout();
	    			 App.linksRegion.show(layout);
			  }
	  };
  });

  return App.Links.Controller;
});