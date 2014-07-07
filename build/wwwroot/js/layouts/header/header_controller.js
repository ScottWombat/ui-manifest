define(["application", "layouts/header/header_layout"], function(App, HeaderLayout){
	
  App.module("Header", function(Header, App, Backbone, Marionette, $, _){
    Header.Controller = {
       addLayout: function(){
    			 var layout = new HeaderLayout.Layout();
    			 App.mainwrapper.show(layout);
      }
    };
  });

  return App.Header.Controller;
});
