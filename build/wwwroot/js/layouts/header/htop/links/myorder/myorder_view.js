define([ "application",'handlebars' ,
         'utils/templateManager',
         'text!layouts/header/htop/links/myorder/templates/myorder_template.html',
         'text!layouts/header/htop/links/myorder/templates/myorderitem_template.html',
         ], function(App,HandleBars,TemplateManager,checkout_tpl,item_tpl) {
	
	
	
	App.module("Checkout.View", function(View,App,Backbone, Marionette, $, _) {
		View.CheckoutModel = Backbone.Model.extend({});
		/*
		View.CheckoutItemView1 = Marionette.ItemView.extend({
			model : new View.CheckoutModel({ 'language': "language"}),
			template:TemplateManager.getTemplate(new_tpl),
			tagname:'li',
			initialize:function(){
				
			},
			events : {
			"click a.signupLink" : "navigateToSignup"
			
			},
			navigateToSignup : function(e) {
			e.preventDefault();
			
			this.trigger("signuplink_clicked");
			}
	
		});
		*/
		View.CheckoutItemView = Marionette.ItemView.extend({
			//model : new View.CheckoutModel(),
			template:TemplateManager.getTemplate(item_tpl),
			tagname:'li',
			//tagname:'tr',
			initialize:function(){
				
			},
			events : {
			"click a.signupLink" : "navigateToSignup"
			
			},
			navigateToSignup : function(e) {
			e.preventDefault();
			
			this.trigger("signuplink_clicked");
			}
	
		});
		
		View.CheckoutCompositeView =  Marionette.CompositeView.extend({
			
			template : TemplateManager.getTemplate(checkout_tpl),
			itemViewContainer : ".checkoutitems",
			itemView: View.CheckoutItemView,
			initialize: function(options){
				
				var items = this.model.get('items');
				this.collection = new Backbone.Collection(items);//options.collection;
				
				
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
				
				$('#myorder div').addClass("active");
				$('#myorder ul').css({"display":"block"});
			},
			deactiveHeader:function(e){
				$('#myorder div').removeClass("active");
				$('#myorder ul').css({"display":"none"});
			},
			
			activeList:function(e){
				e.preventDefault();
				$('#myorder div').addClass("active");
				$('#myorder ul').css({"display":"block"});
			},
			deactiveHeader1:function(e){
				e.preventDefault();
				$('#header .links a').removeClass("active");
			}
			
		    });

		
		
		 View.CheckoutLink = Marionette.CollectionView.extend({
			 itemView : View.CheckoutCompositeView,
			 initialize: function(options){
				// console.info('dddddddddd');
				 //console.info(options.collection);
			 },
			 onRender:function(){
					
			}
		});


		
		
	});
	return App.Checkout.View;
	
});