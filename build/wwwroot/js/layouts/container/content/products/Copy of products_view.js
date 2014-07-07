define(["application",'utils/templateManager','layout/content/products/entities/products'],function(Mystore, TemplateManager){
	
  Mystore.module("Main.Content.View", function(View, Mystore, Backbone, Marionette, $, _){
	
    View.Layout = Marionette.Layout.extend({
    	
      template: TemplateManager.getContentLayoutTemplate(),

      regions: {
        leftPanelRegion: "#column-left",
        productRegion: "#content"
      },
      initialize: function(options){
    	  //alert(options.menuId);
    	 // var productCollection = Mystore.request("products:entities");
    	  this.leftPanelView = new View.LeftPanel();
    	  //this.productPanelView = new View.ProductPanel({menuId:options.menuId});
    	  this.productPanelView = new View.ProductContentLayout();
      	 },
      	 onRender: function() {},

      	 onShow: function() {
			//this.languageRegion.show(this.viewLanguages);
			//this.currencyRegion.show(this.viewCurrencies);
			//this.navRegion.show(this.viewMenu);
      		this.leftPanelRegion.show(this.leftPanelView);
      		//this.productRegion.show(this.productPanelView);
      		this.productRegion.show(this.productPanelView);
      	 }
    
    });
    
    View.ProductContentLayout = Marionette.Layout.extend({
		
	      template: TemplateManager.getProductContentLayoutTemplate(),
	      regions: {
	    	 
	          filterRegion: ".product-filter",
	          productGridRegion : '.product-grid',
	          paginationRegion : '.pagination'
	      },
	      initialize:function(){
	    	  
	    	 var productCollection = Mystore.request("products:entities");
	    	  
	    	  this.filter = new View.ProductFilter();
	    	  this.grid = new View.ProductGrid({collection:productCollection});
	    	  this.pagination = new View.ProductPagination();
	      },
	      onRender:function(){},
	    	  
	      onShow:function(){
	    	  this.filterRegion.show(this.filter);
	    	  this.productGridRegion.show(this.grid);
	    	  this.paginationRegion.show(this.pagination);
	      }
    });
    
    View.LeftPanel = Marionette.ItemView.extend({
      template: TemplateManager.getLeftPanelLayoutTemplate()
      
    });
    
    View.ProductFilter = Marionette.ItemView.extend({
    	 template: TemplateManager.getProductFilterTemplate(),
    });
    
    
    View.ProductPagination = Marionette.ItemView.extend({
      	 template: TemplateManager.getProductPaginationTemplate(),
    });
    
    View.Product = Marionette.ItemView.extend({
     	 template:  TemplateManager.getProductGridTemplate(),
     	
     	events : {
     		'click #cartBtn' : 'navigate1',
			 "click a" : "navigate"
		},
		navigate : function(e) {
			e.preventDefault();
			//this.trigger("navigate", this.model);
			alert("Here");
		},
		navigate1 : function(e) {
			e.preventDefault();
			//this.trigger("navigate", this.model);
			alert(this.model.id);
		}
   });
    
    View.ProductGrid = Marionette.CompositeView.extend({
      	 //template: TemplateManager.getProductGridTemplate(),
    	 template : TemplateManager.getDivTemplate(),
      	 itemView : View.Product,
      	 itemViewContainer : "div",
      	 initialize: function(options){
      		// this.collection= Mystore.request("products:entities");//this.menuId = options.menuId;
      	 }
    });
       
   
    
   
  });
  return Mystore.Main.Content.View;
  
      
});
