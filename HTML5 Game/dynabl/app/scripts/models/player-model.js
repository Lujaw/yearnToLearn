dynabl.Models.PlayerModel = Backbone.Model.extend({
  defaults:{
    alive: false,
    spawnAt: 0,
    score: 0
  },


  initialize: function(){
    this.id = this.get("id");
  },

  setUpdate: function (d){
    this.set("x", d.x);
    this.set("y", d.y);
    this.set("o", d.o);
    this.set("m", d.m);
  }
});
