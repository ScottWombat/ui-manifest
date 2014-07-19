define([ "application", 'layouts/header/htop/links/links_layout',
		'layouts/header/htop/links/wishlist/wishlist_view' ], function(App,
		LinksLayout, WishlistView) {

	App.module("Main", function(Main, App, Backbone, Marionette, $, _) {
		Main.Controller = {
			addLayout : function() {
				//alert("wishlist addlayout");
				
			},
			deleteItem : function(id) {
				var newCollection = App.request("wishitems:removeItem", id);
				alert("dd");
				$.when(newCollection).done(function(newCollection) {

					var viewWishlist = new WishlistView.Wishlist({
						collection : newCollection
					});

					var layout = new LinksLayout.LinksLayout();
					layout.wishlistRegion.show(viewWishlist);

				});

			},
			addItem : function(id) {

				var newCollection = App.request("wishitems:addItem", id);

				$.when(newCollection).done(function(newCollection) {

					var viewWishlist = new WishlistView.Wishlist({
						collection : newCollection
					});

					var layout = new LinksLayout.LinksLayout();
					layout.wishlistRegion.show(viewWishlist);

				});

			},
			addItemToCart:function(id){
				
			}
		};
	});

	return App.Main.Controller;
});
