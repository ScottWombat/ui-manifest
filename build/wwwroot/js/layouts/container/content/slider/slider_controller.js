define(["application", "layouts/container/content/slider/slider_view"], function(App,Layout){
	
  App.module("Container", function(Container, App, Backbone, Marionette, $, _){
    Container.Controller = {
       addLayout: function(){
    			 //var layout = new ContainerLayout.Slider();
    	         var layout = new Layout.Item();
    	         
    	         App.sliderRegion.show(layout);
      },
      close:function(){
    	  App.sliderRegion.close();
      }
    };
  });

  return App.Container.Controller;
});
