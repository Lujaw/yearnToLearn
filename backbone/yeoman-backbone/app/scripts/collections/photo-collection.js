yeomanBackbone.Collections.PhotoCollection = Backbone.Collection.extend({

  model: yeomanBackbone.Models.PhotoModel,

  // return all photos that have been viewed.
  viewed: function() {
    return this.filter(function(photo) {
      return photo.get('isViewed');
    });
  },

  // return all photos that have _not_ been viewed.
  unviewed: function() {
    // see: http://documentcloud.github.com/underscore/#without
    return this.without.apply(this, this.viewed());
  }
});
