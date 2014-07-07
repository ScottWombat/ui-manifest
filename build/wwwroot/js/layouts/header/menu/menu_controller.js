define(["application", "layouts/header/menu/menu_layout","layouts/header/menu/entities/catalogues"], 
		function(App,MenuLayout){
	
  App.module("Menu", function(Menu, App, Backbone, Marionette, $, _){
	  Menu.Controller = {
			  addLayout: function(){
				
				  var catalogueCollection = App.request("catalogues:entities");
				  var viewMenu = new MenuLayout.Catalogues({collection:catalogueCollection});
				  viewMenu.on("itemview:menu:navigate",function(myobject,id){
					  
					  App.trigger("products:show",id);
				  });
				  
				  App.menuRegion.show(viewMenu);
			  },
			  showProduct: function(id){
				
				 // App.sliderRegion.close();
			  }
	  };
  });

  return App.Menu.Controller;
});