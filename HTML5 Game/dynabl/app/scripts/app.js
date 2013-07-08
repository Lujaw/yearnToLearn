define([], function() {


  window.dynabl = function(bomb, player, bombs) {
    this.Models.bomb = bomb;
    this.Models.player = player;
    this.Collection.bombs = bombs;
    this.Views.bombView = bombView;
    this.Views.playerView = playerView;
    this.Views.gameStage = stageView;
    this.Collection.bombs = bombs;
    this.Routers.router = router;

  };
  dynabl.prototype = {
    Views: {},
    Models: {},
    Collections: {},
    Routers: {},
    start: function() {
      this.Views.gameStage.initialize();
      Backbone.history.start();


    }
  }
  });
