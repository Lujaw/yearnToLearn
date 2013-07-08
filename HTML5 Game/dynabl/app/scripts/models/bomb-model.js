dynabl.Models.BombModel = Backbone.Model.extend({
  defaults :{
    x: 0,
    y: 0,
    timPlaced: 0,
    timeTrigger: 0,
    fuseTime: 2500,
    strength: 4,
    owner: 0
  }
});
