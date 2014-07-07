
define(["application"], function(App){
	App.module('Common.Mixin', function(Mixin,App, Backbone, Marionette, $, _) {
		   //Mixin.ModalView = function() {
		Mixin.Modal = function() {
		      var _this = this;
		      var onRender = (this.onRender) ? this.onRender : function() {};

		      this.onRender = function() {
		         _this.showModal();
		         onRender.apply(this);
		      };

		      this.showModal = function() {
		         var view = this;
		         this.$el.addClass('modal');
		         this.$el.on('hidden', function() {
		            view.close();
		         });
		         
		         this.$el.modal('show');
		      };

		      this.hideModal = function() {
		         this.$el.modal('hide');
		      };
		   }
		});
  return App.Common.Mixin;
});
