define([ "application", 'handlebars', 'utils/templateManager',
		'text!layouts/header/htop/links/templates/links_template.html',
		'layouts/header/htop/links/login/login_view',
		'layouts/header/htop/links/signup/signup_view',
		'layouts/header/htop/links/wishlist/wishlist_view',
		'layouts/header/htop/links/myaccount/myaccount_view',
		'layouts/header/htop/links/contact/contact_view',
		'layouts/header/htop/links/myorder/myorder_view',
		'layouts/header/htop/links/wishlist/entities/wishlist',
		'layouts/header/htop/links/myorder/entities/myorder'
		], function(App,
		HandleBars, TemplateManager, tpl, LoginView, SignupView, WishlistView,
		MyaccountView, ContactView, MyOrderView,CartView) {

	App.module("Links.View", function(View, App, Backbone, Marionette, $, _) {
		View.LoginRegion = Marionette.Region.extend({
			el : "#login",
			initialize : function() {
				//console.info('Initialize language region');
				// this.viewLanguage= new LanguageLayout.Layout();
			},
			onShow : function(view) {
				console.log("Login view shown");
				// this.listenTo(view, "itemview:menu:navigate",
				// this.displayMessage);
			},
			displayMessage : function(id) {
				//console.log('regionManager received display:message');
			}
		});
		View.SignupRegion = Marionette.Region.extend({
			el : "#signup",
			initialize : function() {
				//console.info('Initialize Signup region');
				// this.viewLanguage= new LanguageLayout.Layout();
			},
			onShow : function(view) {
				// this.listenTo(view, "itemview:menu:navigate",
				// this.displayMessage);
			},
			displayMessage : function(id) {
				//console.log('regionManager received display:message');
			}
		});
		View.WishlistRegion = Marionette.Region.extend({
			el : "#wishlist",
			initialize : function() {
				//console.info('Initialize wishlistRegion region');
				// this.viewLanguage= new LanguageLayout.Layout();
			},
			onShow : function(view) {
				// this.listenTo(view, "itemview:menu:navigate",
				// this.displayMessage);
			},
			displayMessage : function(id) {
				//console.log('regionManager received display:message');
			}
		});
		View.MyaccountRegion = Marionette.Region.extend({
			el : "#myaccount",
			initialize : function() {
				//console.info('Initialize language region');
				// this.viewLanguage= new LanguageLayout.Layout();
			},
			onShow : function(view) {
				// this.listenTo(view, "itemview:menu:navigate",
				// this.displayMessage);
			},
			displayMessage : function(id) {
				//console.log('regionManager received display:message');
			}
		});
		View.ContactRegion = Marionette.Region.extend({
			el : "#contact",
			initialize : function() {
				//console.info('Initialize language region');
				// this.viewLanguage= new LanguageLayout.Layout();
			},
			onShow : function(view) {
				// this.listenTo(view, "itemview:menu:navigate",
				// this.displayMessage);
			},
			displayMessage : function(id) {
				//console.log('regionManager received display:message');
			}
		});
		View.MyOrderRegion = Marionette.Region.extend({
			el : "#myorder",
			initialize : function() {
				//console.info('Initialize language region');
				// this.viewLanguage= new LanguageLayout.Layout();
			},
			onShow : function(view) {
				// this.listenTo(view, "itemview:menu:navigate",
				// this.displayMessage);
			},
			displayMessage : function(id) {
				//console.log('regionManager received display:message');
			}
		});

		View.LinksLayout = Marionette.Layout.extend({
			/* the auto-generated element which contains this view */
			tagName : 'span',
			/* id attribute for the auto-generated container element */
			id : 'toplinks',

			template : TemplateManager.getTemplate(tpl),
			regions : {
				loginRegion : View.LoginRegion,
				signupRegion : View.SignupRegion,
				wishlistRegion : View.WishlistRegion,
				myaccountRegion : View.MyaccountRegion,
				contactRegion : View.ContactRegion,
				myorderRegion : View.MyOrderRegion

			},
			initialize : function() {
				
				this.viewLogin = new LoginView.Login()
				this.viewSignup = new SignupView.Signup();
			
				var wCollection = App.request("wishitems:entities");
				this.viewWishlist = new WishlistView.Wishlist({collection:wCollection});
				
				this.viewMyaccount = new MyaccountView.Myaccount();
				this.viewContact = new ContactView.Contact();
				
				
				var cCollection = App.request("myorder:entities");
				console.info('cCollection');
				console.info(cCollection);
				this.viewMyorder = new MyOrderView.CheckoutLink({collection:cCollection});
				
				
				//this.viewCheckout= new CheckoutView.CheckoutItemView1();
				
				

			},
			onRender : function() {
				
			},
			onShow : function() {
				this.loginRegion.show(this.viewLogin);
				this.signupRegion.show(this.viewSignup);
				this.wishlistRegion.show(this.viewWishlist);
				this.myaccountRegion.show(this.viewMyaccount);
				this.contactRegion.show(this.viewContact);
				this.myorderRegion.show(this.viewMyorder);
			}

		});

	});

	return App.Links.View;

});