yeomanBackbone.Models.PhotoModel = Backbone.Model.extend({
    //default attribut for the model
    defaults:{
        'src': "placeholder.png",
        'caption': "The default image",
        'isViewed': false,
        'tags': []
    },
    initialize: function(){
        console.log("initialize the photo model");
        console.log(JSON.stringify(this));
    }
});
