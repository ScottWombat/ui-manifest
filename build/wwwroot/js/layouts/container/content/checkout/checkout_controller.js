define(["application", "layouts/container/content/checkout/checkout_layout"], function(App,Layout){
	
  App.module("Container", function(Container, App, Backbone, Marionette, $, _){
    Container.Controller = {
       addLayout: function(){
    			
    	         var layout = new Layout.MainLayout();
    	         App.maincontentRegion.show(layout);
    	         //var wizard = new Layout.WizardLayout();
    	        // App.maincontentRegion.show(wizard);
    	        
      },
      close:function(){
    	 // App.sliderRegion.close();
      }
    };
  });

  return App.Container.Controller;
});