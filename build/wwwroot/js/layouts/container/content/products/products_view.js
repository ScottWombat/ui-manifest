define(["application",'utils/templateManager',
        'text!layouts/container/content/products/templates/mainpanel.html',
        'text!layouts/container/content/products/templates/leftpanel.html',
        'text!layouts/container/content/products/templates/rightpanel.html',
        'text!layouts/container/content/products/templates/product_filter_template.html',
        'text!layouts/container/content/products/templates/pagination_template.html',
        'text!layouts/container/content/products/templates/product_template.html',
        'text!layouts/container/content/products/templates/div_template.html',
        'layouts/container/content/products/entities/products',
        'layouts/container/content/products/entities/products'
        
        //,
       // ,
       // ,
       //,
       // 'text!layouts/container/content/products/templates/layout.html'
        ],
		function(App, TemplateManager,MainPanel,LeftPanel,RightPanel,pro_filter_tpl,pagination_tpl,
				product_tpl,div_tpl){
	
  App.module("Main.Content.View", function(View, App, Backbone, Marionette, $, _){
	
    View.Layout = Marionette.Layout.extend({
    	
      template: TemplateManager.getTemplate(MainPanel),

      regions: {
        leftPanelRegion: "#column-left",
        productRegion: "#content"
      },
      initialize: function(options){
    	  
    	  var productCollection = options.products;
    	 
    	  this.leftPanelView = new View.LeftPanel();
    	 
    	  this.productPanelView = new View.ProductContentLayout({products:productCollection});
      	 },
      	 onRender: function() {},

      	 onShow: function() {
      		
      		this.leftPanelRegion.show(this.leftPanelView);
      		this.productRegion.show(this.productPanelView);
      	 }
    
    });
    
    View.LeftPanel = Marionette.ItemView.extend({
        template: TemplateManager.getTemplate(LeftPanel)
        
      });
    
    View.ProductContentLayout = Marionette.Layout.extend({
		
	      template: TemplateManager.getTemplate(RightPanel),
	      regions: {
	    	 
	          filterRegion: ".product-filter",
	          productGridRegion : '.product-grid1',
	          paginationRegion : '.pagination'
	      },
	      initialize:function(options){
	    	 
	    	// var productCollection = App.request("products:entities");
	    	  var productCollection = options.products;
	    	
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
    
   
    
    View.ProductFilter = Marionette.ItemView.extend({
    	 template: TemplateManager.getTemplate(pro_filter_tpl),
    });
    
    
    View.ProductPagination = Marionette.ItemView.extend({
      	 template: TemplateManager.getTemplate(pagination_tpl),
    });
    
    View.Product = Marionette.ItemView.extend({
     	 template:  TemplateManager.getTemplate(product_tpl),
     	
     	events : {
     		'click #cartBtn' : 'addCartItem',
     		'click #wishlistBtn': 'addWishlistItem',
			'click a' : 'navigate'
		},
		navigate : function(e) {
			e.preventDefault();
			//this.trigger("navigate", this.model);
			//alert("Here");
		},
		addCartItem : function(e) {
			e.preventDefault();

			App.trigger("cart:addItem", this.model.id);
			//alert(this.model.id);
		},
		addWishlistItem:function(e){
			e.preventDefault();
			
			App.trigger("wishitems:addItem", this.model.id);
		}
   });
    
    View.ProductGrid = Marionette.CompositeView.extend({
      	 //template: TemplateManager.getProductGridTemplate(),
    	 template : TemplateManager.getTemplate(div_tpl),
      	 itemView : View.Product,
      	 itemViewContainer : "div",
      	 initialize: function(options){
      		// this.collection= App.request("products:entities");//this.menuId = options.menuId;
      	 }
    });
       
   
    
   
  });
  return App.Main.Content.View;
  
      
});
