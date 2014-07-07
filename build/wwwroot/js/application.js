define(['marionette'],function(Marionette){
	//Marionette.Region.prototype.open = function(view){
	//	  this.$el.hide();
	//	  this.$el.html(view.el);
		  //this.$el.slideDown("slow");
	//	  this.$el.fadeIn();
	//}
	
	var App = new Marionette.Application();
	
	App.loginModal =  Marionette.Region.extend({
		 el: "#loginModal",
		 
		 constructor: function(){
		 //_.bindAll(this);
		 Backbone.Marionette.Region.prototype.constructor.apply(this, arguments);
		 this.on("login:show", this.showModal, this);
		 },
		  
		 getEl: function(selector){
		 var $el = $(selector);
		 $el.on("hidden", this.close);
		 return $el;
		 },
		  
		 showModal: function(view){
		 view.on("close", this.hideModal, this);
		 this.$el.modal('show');
		 },
		  
		 hideModal: function(){
		 this.$el.modal('hide');
		 }
	 });
	
	App.LanguageRegion =  Marionette.Region.extend({
		 el: "#language",
		 //currentView: myView
		 initialize: function(options){
		    // your init code, here
		 },
		 open: function(view){
			  
			    this.$el.hide();
			    this.$el.html(view.el);
			    this.$el.slideDown(2500);
		 },
		 close:function(view){
			    this.$el.slideUp(2500);
		 }
	 });
	
	App.CurrencyRegion =  Marionette.Region.extend({
		 el: "#currency",
		 //currentView: myView
		 initialize: function(options){
		    // your init code, here
		 },
		 open: function(view){
			  
			    this.$el.hide();
			    this.$el.html(view.el);
			    this.$el.slideDown(2500);
		 },
		 close:function(view){
			    this.$el.slideUp(2500);
		 }
	 });
	
	App.LinksRegion =  Marionette.Region.extend({
		 el: ".links",
		 initialize: function(options){
		   
		 },
		 open: function(view){
			    this.$el.hide();
			    this.$el.html(view.el);
			    this.$el.slideDown(2500);
		 },
		 close:function(view){
			   this.$el.slideUp(2500);
		 }
	 });
	
	App.SearchRegion =  Marionette.Region.extend({
		 el: "#search",
		 //currentView: myView
		 initialize: function(options){
		    // your init code, here
		 },
		 open: function(view){
			  
			    this.$el.hide();
			    this.$el.html(view.el);
			    this.$el.slideDown(2500);
		 },
		 close:function(view){
			 
			   this.$el.slideUp(2500);
		 }
	 });
	App.CartRegion =  Marionette.Region.extend({
		 el: "#cart",
		 //currentView: myView
		 initialize: function(options){
		    // your init code, here
		 },
		 open: function(view){
			  
			    this.$el.hide();
			    this.$el.html(view.el);
			    this.$el.slideDown(2500);
		 },
		 close:function(view){
			    this.$el.slideUp(2500);
		 }
	 });
	App.MenuRegion =  Marionette.Region.extend({
		 el: "#menu",
		 //currentView: myView
		 initialize: function(options){
		    // your init code, here
		 }
	 });
	
	App.SliderWrapperRegion =  Marionette.Region.extend({
		 el: ".slider-wrapper",
		 //currentView: myView
		 initialize: function(options){
		    // your init code, here
		 },
		 open: function(view){
			  
			    this.$el.hide();
			    this.$el.html(view.el);
			    this.$el.slideDown(2500);
		 },
		 close:function(view){
			 
			   this.$el.slideUp(2500);
		 }
	 });
	App.MainContentRegion =  Marionette.Region.extend({
		 el: ".maincontent",
		 //currentView: myView
		 initialize: function(options){
		    // your init code, here
		 },
		 open: function(view){
			  
			    this.$el.hide();
			    this.$el.html(view.el);
			    this.$el.slideDown(2500);
		 },
		 close:function(view){
			 
			   this.$el.slideUp(2500);
		 }
	 });
	
	
	// app.root ='/';
	App.addRegions({
		
		languageRegion    : App.LanguageRegion,
		currencyRegion    : App.CurrencyRegion,
		linksRegion       : App.LinksRegion,
		searchRegion      : App.SearchRegion,
		cartRegion	      : App.CartRegion,
		menuRegion        : App.MenuRegion,
		sliderRegion      : App.SliderWrapperRegion,
		maincontentRegion :App.MainContentRegion
		
	});

	App.navigate = function(route, options) {
		options || (options = {});
		Backbone.history.navigate(route, options);
	};

	App.getCurrentRoute = function() {
		return Backbone.history.fragment
	};
	
	App.startSubApp = function(appName, args){
	    var currentApp = appName ? App.module(appName) : null;
	    if (App.currentApp === currentApp){ return; }

	    if (App.currentApp){
	    	App.currentApp.stop();
	    }

	    App.currentApp = currentApp;
	    if(currentApp){
	      currentApp.start(args);
	    }
	  };

	  
   App.addInitializer(function (options) {
	  
   });
   
   
   App.on("initialize:after", function() {
		
		if (Backbone.history) {
				require(['layouts/container/content/products/products_app'],function(){
				
							Backbone.history.start();
							if (App.getCurrentRoute() === "") {
							//Mystore.trigger("slide:show");
						     }
				});
		}
	});
   
	return App;
});