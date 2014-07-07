define(["application", "layouts/container/content/viewcart/viewcart_view"], function(App,Layout){
	
  App.module("Container", function(Container, App, Backbone, Marionette, $, _){
    Container.Controller = {
       addLayout: function(){
    			 //var layout = new ContainerLayout.Slider();
    	         var layout = new Layout.Item();
    	         
    	         App.maincontentRegion.show(layout);
      },
      close:function(){
    	 // App.sliderRegion.close();
      }
    };
  });

  return App.Container.Controller;
});