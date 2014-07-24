define(["application", "layouts/container/content/checkout/menubar/menubar_layout"], function(App,Layout){
	
  App.module("Container", function(Container, App, Backbone, Marionette, $, _){
    Container.Controller = {
       addLayout: function(){
    			
    	       //  var layout = new Layout.MainLayout();
    	        // App.maincontentRegion.show(layout);
    	      
      },
      close:function(){
    	 // App.sliderRegion.close();
      },
      update:function(){
    	  alert("update"  );
      }
    };
  });

  return App.Container.Controller;
});