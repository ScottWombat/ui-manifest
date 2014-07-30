define(
		[
				'application',
				'utils/templateManager',
				'text!layouts/container/content/checkout/templates/checkout_template.html',
				'layouts/container/content/checkout/menubar/menubar_layout',
				'layouts/container/content/checkout/steps/steps_layout','backbone.syphon'
				//'layouts/container/content/checkout/content/step1/step1_layout'
				 ],
		function(App, TemplateManager, tpl,Steps, Step1) {

			App.module("Checkout.Layout", function(Layout, App, Backbone,
					Marionette, $, _) {
				Layout.StepsRegion = Marionette.Region.extend({
					el : "#steps",
					initialize : function() {
						// console.info('Initialize checkout steps region');
						// this.viewLanguage= new LanguageLayout.Layout();
					},
					onShow : function(view) {
						// console.log("steps view shown");
						// this.listenTo(view, "itemview:menu:navigate",
						// this.displayMessage);
					},
					displayMessage : function(id) {
						console.log('regionManager received display:message');
					}
				});

				Layout.ContentRegion = Marionette.Region.extend({
					el : "#stepcontent",
					initialize : function() {
						// console.info('Initialize checkout content region');
						// this.viewLanguage= new LanguageLayout.Layout();
					},

					open : function(view) {
						this.$el.hide();
						this.$el.html(view.el);
						this.$el.slideDown(2500);
					},
					close : function(view) {
						this.$el.slideUp(2500);
					}
				});
				
				Layout.MainLayout = Marionette.Layout.extend({

					tagName : 'div',
					/* id attribute for the auto-generated container element */
					id : 'checkout_main',

					template : TemplateManager.getTemplate(tpl),
					regions : {
						stepsRegion : Layout.StepsRegion,
						contentRegion : Layout.ContentRegion,
					},
					initialize : function() {

						this.viewSteps = new Steps.Steps();

						if (typeof sessionToken === 'undefined') {

							// this.viewContent = new Step1.Content();
						} else {
							// this.viewContent = new Step1.Content();
						}

					},
					
					onShow : function() {
						this.stepsRegion.show(this.viewSteps);
						if (typeof sessionToken === 'undefined') {
							// this.contentRegion.show(new Step1.MainLayout());
							this.contentRegion.show(new Step1.Content({steps:this.viewSteps}))
						} else {
							// this.contentRegion.show(new Step2.Content());
						}

					}
				});

			    /*
				Layout.Node = Marionette.Controller.extend({
					_next :null, // reference next node
					_previous : null, // reference previus node
					_view : null, // referce current view
					tab :null,
					
					setPrevious : function(node) {
							this._previous = node;
							return this;
					}, // chainable!
					getPrevious : function() {
							return this._previous;
						},
					setNext : function(node) {
							this._next = node;
							return this;
					}, // chainable!
					getNext : function() {
							return this._next;
					},
					getView : function() {
							return this._view;
						},
					getTab : function() {
							return this._tab;
						}
					
				});

				Layout.WizardViews = Marionette.Controller.extend({
					
					_head : null,
					_tail : null,
					_current : null,
					first : function() {
						return _head;
					},
					last : function() {
						return _tail;
					},
					moveNext : function() {
						return (_current !== null) ?this. _current = this._current
								.getNext() : null;
					}, // set current to next and return current or return null
					movePrevious : function() {
						return (_current !== null) ? _current = _current
								.getPrevious() : null;
					}, // set current to previous and return current or return
						// null
					getCurrent : function() {
						return this._current;
					},
					insertView : function(view) {
						if (this._tail === null) { // list is empty (implied head
												// is null)
							this._current = this._tail = this._head = new Layout.Node(view);
						} else {// list has nodes
							this._tail = this._tail.setNext(
									new Layout.Node(view).setPrevious(_tail))
									.getNext();
						}
					},
					setCurrentByTab : function(tab) {
						var node = _head;
						while (node !== null) {
							if (node.getTab() !== tab) {
								node = node.getNext();
							} else {
								_current = node;
								break;
							}
						}
					}

				})
				
				Layout.View1 = Marionette.ItemView.extend({
					//template : TemplateManager.getTemplate(view1Tpl),
				}),

				Layout.WizardLayout = Marionette.ItemView.extend({
					//template : TemplateManager.getTemplate(newTpl),
					wizardViews : new Layout.WizardViews(),
					tagName : "div",
					className : 'container',
					initialize:function(){
						this.wizardViews.insertView(new Layout.View1());
						alert("init");
					},
					events : {
						"click a" : "navigate",
					},

					navigate : function(e) {
						e.preventDefault();
						e.stopPropagation();
						var menuId = $(e.currentTarget).attr('id');

						this.trigger("menu:navigate", menuId, menuId);
						// this.trigger("menu:navigate",menuId);
					},
					onRender : function() {
						   var currentView = this.wizardViews.getCurrent();
						   console.info(currentView);
							//alert(curren);
							//$(currentView.getView().render().el).show();
							// this.contentRegion.show(currentView);
					}
					 
				});
				
				
				*/
				

			});
			return App.Checkout.Layout;
		});