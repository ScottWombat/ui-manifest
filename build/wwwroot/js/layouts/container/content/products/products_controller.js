define(["application", 
        "layouts/container/content/products/products_view"], 
		function(App, ProductLayout){
	
  App.module("Products", function(Products, App, Backbone, Marionette, $, _){
    Products.Controller = {
    
      showProducts: function(menuId){
    	
    	 this.view = new ProductLayout.Layout({request:'products:entities',key:menuId});
    	 App.sliderRegion.close();
    	 App.maincontentRegion.show(this.view);
    	
      },
      /*
      listProducts:function(menuId){
    	  var productCollection =App.trigger("products:entities",'Mobile Phones',2,5);
    	  $.when(productCollection).done(function(cCollection) {
				
    		  App.productRegion.close();
			})
      },
      */
      listProductsByBrand:function(key){
    	  this.view = new ProductLayout.Layout({request:'products:entitiesByBrand',key:key});
    	      	
    	 if(this.view.grid1.collection.length == 0){
    		 this.showMessageBox('We could not have any product for the brand');
    	 }else{
    		 App.sliderRegion.close();
    	     App.maincontentRegion.show(this.view);
    	 };
    	
      },
      searchProduct:function(key){
    	  this.view = new ProductLayout.Layout({request:'products:search',key:key});
    	  //console.info('ddddd');
	      //console.info(this.view.grid1.collection.model.length);
     	 if(this.view.grid1.collection.model.length == 0){
     		 this.showMessageBox('We could not have any product from your search');
     	 }else{
     		 App.sliderRegion.close();
     	     App.maincontentRegion.show(this.view);
     	 };
      },
      setActiveHeader: function(headerUrl){
        var links = App.request("catalogues:entities",id);
       // var headerToSelect = links.find(function(header){ return header.get("url") === headerUrl; });
   
      },
      showMessageBox:function(msg){
			$('input:text[name=search]').focus();
			$dvMsg=$('<div></div>').html('<br><br>'+msg).dialog({
				autoOpen:false,
				width:250, height:200,
				show: {
					effect:"drop",
					duration:700
				},
				hide: {
					effect:"drop",
					duration:700
				},
		        title:"Search",
		        modal: true,
		        overlay: { opacity: 0.5, backgroundColor: 'black'},
				buttons:[{
					text:'OK',
					width:50,
					click:function(){
						$(this).dialog('close');
					}
				}],
				open: function(){
		          
		            $(".ui-dialog-titlebar-close").hide();   
		        }
			});
			$dvMsg.dialog('open');
			 
			
			return false;
		}
    };
  });

  return App.Products.Controller;
});
