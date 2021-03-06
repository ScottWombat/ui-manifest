define([ "application", 'layouts/header/hsecond/cart/cart_view',
		'layouts/header/hsecond/cart/entities/cart' ], function(App, CartView) {

	App.module("Main",
			function(Main, App, Backbone, Marionette, $, _) {
				Main.Controller = {

					addLayout : function() {

						var cartCollection = App.request("cart:entities");
						console.info("DD");
						console.info(cartCollection);
						$.when(cartCollection).done(function(cCollection) {
							var cartview = new CartView.Carts({
								collection : cartCollection
							});
							App.cartRegion.show(cartview);
						})

					},
					refreshEntities : function() {
						var refreshCollection = App.request("cart:entities");
						$.when(refreshCollection).done(
								function(refreshCollection) {
									var cartview1 = new CartView.Carts({
										collection : refreshCollection
									});
									// cartView1.collection.reset();
									App.cartRegion.show(cartview1);
								})

					},
					removeItem : function(id) {
						var newCollection = App.request(
								"cart:entities:removeitem", id);
						$.when(newCollection).done(function(cCollection) {
							var cartview = new CartView.Carts({
								collection : cCollection
							});
							App.cartRegion.show(cartview);
						})

						// this.view.collection.fetch();
					},
					addItem : function(id) {
						var $loading = $('#loading');
						$loading.addClass('loadingspinner');
						this.spinner = new Spinner().spin(loadingTarget);

						$('#loading').hide();
						$('#loading').fadeIn( 1800 );

						var newCollection = App.request("cart:entities:update",id);
                        console.info("cartCollection");
                        console.info(newCollection);
						var that = this;
						$.when(newCollection).done(function(cartCollection) {
							console.info('cartCollection');
							console.info(cartCollection);
							$('#loading').fadeOut( 1800 );

							var cartView = new CartView.Carts({
								collection : cartCollection
							});
							App.cartRegion.show(cartView);

							var $loading = $('#loading');
							$loading.removeClass('loadingspinner');
						});

					}
				};
			});

	return App.Main.Controller;
});