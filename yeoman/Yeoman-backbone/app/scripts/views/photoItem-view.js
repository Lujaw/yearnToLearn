yeoman.Views.photoItemView = Backbone.View.extend({

  //template: photo_item
  tagName: "article",
  className: "contact-container",
  template: $("#contactTemplate").html(),
  render: function() {
    // console.log("contact view initialized");
    var tmpl = _.template(this.template);
    this.$el.html(tmpl(this.model.toJSON()));
    return this;
  }

});
