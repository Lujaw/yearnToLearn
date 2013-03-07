
window.yeomanBackbone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  init: function() {
    console.log('Hello from Backbone!');
    new yeomanBackbone.Models.PhotoModel({
        src: "placeholder.jpg",
        caption: "This is me",
        tags: ['this',"that"]
    });

//     new yeomanBackbone.Collections.PhotoCollection([{
//         src : "another.jpg",
//         caption: "this is me",
//         tags: ["#me"]
//     }]);
  }
};

$(document).ready(function(){
  yeomanBackbone.init();
});
