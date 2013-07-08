define([
    'backbone'
],
function (backbone ) {
var gameStageView = Backbone.View.extend({

  //template: game_stage
  //
  defaults: {
    var VIEW_W = 640;
    var VIEW_H = 480;
    var CANVAS_NAME = game_canvas;
  },

  initialize: function() {
    console.log("canvas initialized");
    $gameStage = '< canvas id = "' + CANVAS_NAME + ' "width="' + VIEW_W + ' " height =" ' + VIEW_H + '> </canvas> ';

    //canvas
    this.$canvas = document.getElementById("gameStage").append($gameStage);
    this.context = $canvas.getContext("2d");

  }

  return gameStageView ;

});
}
