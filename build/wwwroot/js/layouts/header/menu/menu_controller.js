define(["application", "layouts/header/menu/menu_layout","layouts/header/menu/entities/catalogues"], 
		function(App,MenuLayout){
	
  App.module("Menu", function(Menu, App, Backbone, Marionette, $, _){
	  Menu.Controller = {
			  addLayout: function(){
				  var catalogueCollection = App.request("catalogues:entities");
				  var viewMenu = new MenuLayout.Catalogues({collection:catalogueCollection});
				  viewMenu.on("itemview:menu:navigate",function(menuId,menuId){
					  App.trigger("products:show",menuId);
				  });
				  viewMenu.on("itemview:menu:brandClick",function(key,key){
					 // App.trigger("products:show","Soccer");
					 // alert("menuclick");
					  App.trigger("products:listByBrand",key);
					 
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