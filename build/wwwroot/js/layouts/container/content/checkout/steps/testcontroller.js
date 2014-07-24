Marionette.Controller.extend({
  showById: function(id){
    var model = new MyModel({
      id: id
    });

    var promise = model.fetch();

    $.when(promise).then(_.bind(this.showIt, this));
  },

  showIt: function(model){
    var view = new MyView({
      model: model
    });

    MyApp.myRegion.show(view);
  }
});