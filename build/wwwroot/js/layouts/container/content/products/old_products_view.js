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
    	  var menuId = options.menuId;
    	  this.leftPanelView = new View.LeftPanel({menuId:menuId});
    	 
    	  this.productPanelView = new View.ProductContentLayout({products:productCollection,menuId:menuId});
      	 },
      	 onRender: function() {},

      	 onShow: function() {
      		
      		this.leftPanelRegion.show(this.leftPanelView);
      		this.productRegion.show(this.productPanelView);
      	 }
    
    });
    
    View.LeftPanel = Marionette.ItemView.extend({
        template: TemplateManager.getTemplate(LeftPanel),
        initialize:function(options){
        	this.menuId = options.menuId
        }
      });
    
    View.ProductPage =  Backbone.Model.extend({
    	
    	initialize:function(options){
    		this.url= REST_URL + "product/list/" + options.menuId + "/" + options.pageNumber +"/" + options.pageSize + "?callback=jsonCallback";
    		//console.info("DD");
    		//console.info(this.url);
    		this.on('change', this.notifyGeneral, this);
    	},
    	notifyGeneral:function(){
    		alert('ddddddddddd');
    	}
   
    });
    
    View.ProductContentLayout = Marionette.Layout.extend({
		
	      template: TemplateManager.getTemplate(RightPanel),
	      regions: {
	    	 
	          filterRegion: ".product-filter",
	          productGridRegion : '.product-grid1',
	          paginationRegion : '.pagination'
	      },
	      initialize:function(options){
	    	 var menuId = options.menuId;
	    	  
	    	 this.filter = new View.ProductFilter({menuId:menuId});
	    	 var pageSize = this.filter.model.get('pageSize');
	    	 
	    	 var productCollection = App.request("products:entities",menuId,1,pageSize);   
	    	 
	    	 
	    	// var pagination1 = App.request("products:pagination",menuId,pageSize);   
	    	 var paging = new View.PaginationModel({menuId:menuId});
	    	
	    	
	    	  this.grid = new View.ProductGrid({collection:productCollection});
	    	  this.pagination = new View.ProductPagination({menuId:menuId});
	    	
	      },
	      onRender:function(){},
	    	  
	      onShow:function(){
	    	  this.filterRegion.show(this.filter);
	    	  this.productGridRegion.show(this.grid);
	    	  this.paginationRegion.show(this.pagination);
	      }
    });
    
    View.ProductFilterModel =  Backbone.Model.extend({
    	defaults:{
    		pageSize:5
    	},
    	initialize:function(){
    		//this.pageSize=10;
    	}
    });
    
    View.ProductFilter = Marionette.ItemView.extend({
    	 template: TemplateManager.getTemplate(pro_filter_tpl),
    	 model: new View.ProductFilterModel(),
    	 initialize:function(options){
    		 
    		 this.menuId = options.menuId;
    		 //this.collection=options.collection;
    	 }
    });
    
    View.PaginationModel =  Backbone.Model.extend({
    	  defaults:{
    		  pages:'',
    		  records:''
    	  },
    	 
          initialize:function(options){
    		 
    		 this.menuId = options.menuId;
    		
    		 this.url = REST_URL + "product/count/" + this.menuId + "/" + '1' + "?callback=jsonCallback";
    		 this.fetch();
    		
    	 },
    	 parse: function (response) {
    		//alert('ddd' + response.pages);
    		// this.set('pages','22');
 	        //return response;
    		 
    		 response.pages = 'response.pages';
    		 return response;
 	    },
 	    getPages:function(){
 	    	return this.pages;
 	    },
 	    getRecords:function(){
 	    	return this.records;
 	    }
    	
    });
    
    
    View.ProductPagination = Marionette.ItemView.extend({
      	 template: TemplateManager.getTemplate(pagination_tpl),
      	 //model : new View.
      	 initialize:function(options){
      		 this.menuId = options.menuId;
      		 this.model = new View.PaginationModel({menuId:this.menuId});
      	 },
     	 events : {
     		'click .paging' : 'doPaging'
     	 },
     	doPaging:function(e){
			e.preventDefault();
			console.info("Target");
			var id = $(e.target).attr('id');
			//alert(id);
			this.trigger("menu:navigate",this.menuId,this.menuId);
		},
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
