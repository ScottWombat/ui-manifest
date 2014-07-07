define(["application", "layouts/main-wrapper_layout",'layouts/header/header_layout'], function(App,Layout,Header){
	
  App.module("Container", function(Container, App, Backbone, Marionette, $, _){
    Container.Controller = {
       addLayout: function(){
    			 //var layout = new ContainerLayout.Slider();
    	         var layout = new Layout();
    	         
    	         layout.addRegion("mainwrapper","#main-wrapper");
    	         layout.header.show(new Header());
    	         layout.render();
    			 App.wrapper.show(layout);
      }
    };
  });

  return App.Container.Controller;
});
