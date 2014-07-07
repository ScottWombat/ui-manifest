define([ "application",'handlebars' ,
         'utils/templateManager',
         'text!layouts/header/htop/links/wishlist/templates/wishitem_template.html',
         'text!layouts/header/htop/links/wishlist/templates/wishlist_template.html'
         ], function(App,HandleBars,TemplateManager,wishitem_tpl,wishlist_tpl) {
	
	App.module("Wishlist.View", function(View,App,Backbone, Marionette, $, _) {
		
		View.WishListItemCompositeView = Marionette.ItemView.extend({
			
			template:TemplateManager.getTemplate(wishitem_tpl),
			tagName : "li",
			events:{
				"click h4 a.addItem" : "addItem",
				"click h4 a.deleteItem" : "deleteItem"
			},
			addItem : function(e) {
				e.preventDefault();
				
				$('#wishlist ul').css({"display":"none"});
				App.trigger("wishlist:addItem", this.model.get('id'));
			},
			deleteItem : function(e){
				e.preventDefault();
				$('#wishlist ul').css({"display":"none"});
				App.trigger("wishlist:deleteItem", this.model.get('id'));
			}
		});
		
		View.WishListCompositeView =  Marionette.CompositeView.extend({
			id:'mylinks1',
			template : TemplateManager.getTemplate(wishlist_tpl),
			itemViewContainer : ".wishitems",
			itemView: View.WishListItemCompositeView,
			initialize: function(){
				 var items = this.model.get('items');
				 this.collection = new Backbone.Collection(items);
			},
			events : {
				//"click span" : "navigate",
				'mouseover a': "activeHeader",
				'mouseout a': "deactiveHeader",
				'mouseover ul': 'activeList',
				'mouseout ul': 'deactiveHeader',
			},
			activeHeader:function(e){
				e.preventDefault();
				
				$('#wishlist div').addClass("active");
				$('#wishlist ul').css({"display":"block"});
			},
			deactiveHeader:function(e){
				$('#wishlist div').removeClass("active");
				$('#wishlist ul').css({"display":"none"});
			},
			
			activeList:function(e){
				e.preventDefault();
				$('#wishlist div').addClass("active");
				$('#wishlist ul').css({"display":"block"});
			},
			deactiveHeader1:function(e){
				e.preventDefault();
				$('#header .links a').removeClass("active");
			}
			
		});
		
         View.WishListCollectionView = Marionette.CollectionView.extend({
			 itemView : View.WishListCompositeView,
		});
	});
	
	return App.Wishlist.View;
	
});