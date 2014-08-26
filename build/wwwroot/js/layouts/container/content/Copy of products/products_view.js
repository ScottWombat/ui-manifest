define(["application",'utils/templateManager',
        'text!layouts/container/content/products/templates/mainpanel.html',
        'text!layouts/container/content/products/templates/leftpanel.html',
        'text!layouts/container/content/products/templates/rightpanel.html',
        'text!layouts/container/content/products/templates/product_filter_template.html',
        'text!layouts/container/content/products/templates/pagination_template.html',
        'text!layouts/container/content/products/templates/product_template.html',
        'text!layouts/container/content/products/templates/div_template.html',
        'text!layouts/container/content/products/templates/productlist_template.html',
        'layouts/container/content/products/entities/products'


        ],
		function(App, TemplateManager,MainPanel,LeftPanel,RightPanel,pro_filter_tpl,pagination_tpl,
				product_tpl,div_tpl,productlist_tpl){
	
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
    	//  this.productListView = new View.ProductList();
    	  this.productPanelView = new View.ProductContentLayout({products:productCollection,menuId:menuId});
      	 },
      	 onRender: function() {
      		this.leftPanelRegion.show(this.leftPanelView);
      		this.productRegion.show(this.productPanelView);
      	 },

      	// onShow: function() {
      		
      		//this.leftPanelRegion.show(this.leftPanelView);
      		//this.productRegion.show(this.productPanelView);
      		
      	// }
    
    });
    
    View.LeftPanel = Marionette.ItemView.extend({
        template: TemplateManager.getTemplate(LeftPanel),
        initialize:function(options){
        	this.menuId = options.menuId
        }
      });
    
   
    View.ProductContentLayout = Marionette.Layout.extend({
		
	      template: TemplateManager.getTemplate(RightPanel),
	      regions: {
	    	 
	        //  filterRegion: ".product-filter",
	          productGridRegion : '.product-list',
	        //  paginationRegion : '.pagination'
	      },
	      initialize:function(options){
	    	 var menuId = options.menuId;
	    	
	    	// var productCollection = App.request("products:entities",menuId,1,5);   
	    	
	    	 //this.grid1 = new View.ProductList({collection:productCollection});
	    	 this.grid1 = new View.ProductList({menuId:menuId});
	    	 
	    	
	      },
	      onRender:function(){
	    	  this.productGridRegion.show(this.grid1);
	      },
	    	  
	     // onShow:function(){
	    	
	    //	 this.productGridRegion.show(this.grid1);
	    	 
	     // }
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
    /*
     * 
     View.ProductPage =  Backbone.Model.extend({
    	
    	initialize:function(options){
    		this.url= REST_URL + "product/list/" + options.menuId + "/" + options.pageNumber +"/" + options.pageSize + "?callback=jsonCallback";
    		//console.info("DD");
    		//console.info(this.url);
    		this.on('change', this.notifyGeneral, this);
    	},
    	notifyGeneral:function(){
    		//alert('ddddddddddd');
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
    */
    View.Product = Marionette.ItemView.extend({
     	 template:  TemplateManager.getTemplate(product_tpl),
     	 initialize:function(options){
     		console.info('Initialize product view');
     	 },
     //	modelEvents: {
     //	    'change': 'render'
     //	},
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
		},
		addWishlistItem:function(e){
			e.preventDefault();
			App.trigger("wishitems:addItem", this.model.id);
		}
   });
    
    View.ProductGrid = Marionette.CompositeView.extend({
    	 id:'myproductgrid',
    	 itemView : View.Product,
      	 //template: TemplateManager.getProductGridTemplate(),
    	 template : TemplateManager.getTemplate(productlist_tpl),
      	 itemViewContainer : '.product-grid',
      	 initialize:function(options){
      		//this.bindTo(this.model, 'change', this.render);
      		// _.bindAll(this);
      	    //this.model.on('change', this.render);
      	 },
      	 events : {
     	
			'click a.paging': 'goToPage',
			'change #sortBy' : 'doSort',
			'change #byPageSize' : 'doPageSize'
			
		 },
		 doSort: function(e){
			 e.preventDefault();
			var name= $(e.target).val().split('_')[0];
			var sortType= $(e.target).val().split('_')[1];
			
			this.collection.comparator = function(item) {
				if(sortType=='ASC'){
				    return item.get(name);
				}else{
					return -item.get(name);
				}
			};
            this.collection.sort();
          
			
			
            this.collection.trigger('reset');
			
         },
         doPageSize:function(e){
        	 e.preventDefault();
        	 var pageSize= $(e.target).val();
        	 var pagination =this.model.get('pagination');
        	// console.info(pag);
        	 var url = REST_URL + "product/productlist/" + pagination.catalogueName + "/" + pagination.currentPage + "/" + pageSize;
        	 //alert(value);
        	 var _that =this;
 			//$.getJSON('http://localhost:8080/rs-manifest/product/productlist/Mobile Phones/2/5', function(data) {
 			$.getJSON(url, function(data) {
 				  _that.collection = new Backbone.Collection(data.products)
 				   _that.model.set('pagination',data.pagination);
 				   _that.render();
 			});
         },
		 goToPage:function(e){
			e.preventDefault();
			var id = $(e.target).attr('id');
			alert(id);
			var url = REST_URL + "product/productlist/" + id;
			var _that =this;
			//$.getJSON('http://localhost:8080/rs-manifest/product/productlist/Mobile Phones/2/5', function(data) {
			$.getJSON(url, function(data) {
				  _that.collection = new Backbone.Collection(data.products)
				   _that.model.set('pagination',data.pagination);
				   _that.render();
			});
			 
		 },
      	 
      	 initialize: function(options){
      		console.info("initialize product grid");
      		
			var items = this.model.get('products');
			this.collection = new Backbone.Collection(items);
      	 }
    });
    
    View.ProductList= Marionette.CollectionView.extend({
    	pageNo:1,
    	pageSize:5,
		itemView : View.ProductGrid,
		initialize:function(options){
			this.menuId = options.menuId;
			 var productCollection = App.request("products:entities",this.menuId,this.pageNo,this.pageSize);   
			 this.collection= productCollection;
			//console.info("initialize product collection view");
		},
		
		onRender:function(){
			
		}
	});
       
   
    
   
  });
  return App.Main.Content.View;
  
      
});
