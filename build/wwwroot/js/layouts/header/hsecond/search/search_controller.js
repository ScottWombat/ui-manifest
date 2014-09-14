define(["application", "layouts/header/hsecond/search/search_view"], function(App, SearchView){
	
  App.module("Main", function(Main, App, Backbone, Marionette, $, _){
    Main.Controller = {
      addLayout: function(){
    			 var layout = new SearchView.Search();
    			
    			 layout.on("search:navigate",function(keyword,keyword){
    				 //alert(keyword);
					 App.trigger("products:search",keyword);
				  });
    			 
    			 App.searchRegion.show(layout);
    
     
      }
    };
  });

  return App.Main.Controller;
});
