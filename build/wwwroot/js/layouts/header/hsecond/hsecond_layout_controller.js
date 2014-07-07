define(["application", "layout/hsecond/hsecond_layout"], function(Mystore, ViewHsecondLayout){
	
  Mystore.module("Main", function(Main, Mystore, Backbone, Marionette, $, _){
    Main.Controller = {
      insertLayout: function(){
    	 
    			
    			 var layout = new ViewHsecondLayout.Layout()
    			
    			 Mystore.hsecond.show(layout);
    
     
      }
    };
  });

  return Mystore.Main.Controller;
});
