;
(function() {
  console.log("block called");
  var colors = ["#F0533F", "#089BD7", "#E9A13E", "#E8694F", "#B85B60", "#5D345A", "#4E9F67", "#4C6699", "#E7463E", "#9BC8C8",

"#9BD28D", "#D1B461", "#56373C", "#B75959", "#659163", "#20A1D1", "#ECA830", "#CD3838", "#76AB26", "#D99B4B", "#C55235", "#B3611D", "#5A5F0A", "#7A194E", "#B5401E"
],
    transitions = {
      fromBottom: {
        before: [0, '100%'],
        after: [0, '-100%'],
        wrapper: [0, '4em']
      },
      fromTop: {
        before: [0, '-100%'],
        after: [0, '100%'],
        wrapper: [0, '-4em']
      },
      fromLeft: {
        before: ['-100%', 0],
        after: ['100%', 0],
        wrapper: ['-4em', 0]
      },
      fromRight: {
        before: ['100%', 0],
        after: ['-100%', 0],
        wrapper: ['4em', 0]
      }
    };

  var Block = function(container) {

    this.backgroundColors = colors;

    this.container = container;

    this.a = new Pane();
    this.b = new Pane();

    this.pane = this.a;
    this.oldPane = this.b;

    // this.typer = new Typer(_.bind(this.onCharacters, this));

    this.domElement = document.createElement('div');
    this.domElement.className = 'block';
    this.domElement.appendChild(this.a.domElement);
    this.domElement.appendChild(this.b.domElement);

    var _this = this;

    this.onTransitionEnd = function(e) {


      setOffset(_this.oldPane.domElement,
        transitions[_this.transition].before[0],
        transitions[_this.transition].before[1]);

      setOffset(_this.oldPane.wrapper,
        transitions[_this.transition].wrapper[0],
        transitions[_this.transition].wrapper[1]);

      _this.oldPane.wrapper.style.opacity = 0;

    };

    this.container.appendChild(this.domElement);
    this.onResize();

    this.shown = 0;
    this.selectRandomTransition();

  };


  Block.prototype.show = function(str, onComplete) {
    console.log("show reached");
    onComplete = onComplete || _.identity;

    // bandaid for whiteflash
    this.backgroundColors = _.shuffle(this.backgroundColors);
    this.container.style.backgroundColor = this.backgroundColors[Math.floor(Math.random() * this.backgroundColors.length)];
    console.log(this.pane.domElement.style.backgroundColor);

    this.shown++;

    var _this = this;

    if (this.pane == this.a) {
      this.pane = this.b;
      this.oldPane = this.a;
    } else {
      this.pane = this.a;
      this.oldPane = this.b;
    }

    // Check string for right-to-left characters
    this.pane.domElement.setAttribute('dir', 'ltr');
    this.oldPane.domElement.style.zIndex = 0;

    transitionOffset(this.oldPane.domElement,
      transitions[this.transition].after[0],
      transitions[this.transition].after[1],
      this.onTransitionEnd,
      400);

    this.selectRandomTransition();
    this.pane.wrapper.style.opacity = 1;
    this.pane.clear();
    this.pane.domElement.style.backgroundColor = this.backgroundColors[this.shown % this.backgroundColors.length];
    this.pane.domElement.style.zIndex = 1;
    this.pane.input.innerHTML = str;

    transitionOffset(this.pane.domElement, 0, 0, undefined, 400);
    transitionOffset(this.pane.wrapper, 0, 0, undefined, 1150);



    onComplete();

    var _this = this;
    this.pane.blinker.end();
    // this.typer.start(str, function() {
    //   _this.pane.blinker.start();
    //   onComplete();
    // });


  };

  Block.prototype.onCharacters = function(c) {
    this.pane.addCharacters(c);
  };

  Block.prototype.selectRandomTransition = function() {
    this.transition = _.first(_.shuffle(_.keys(transitions)));
  };

  Block.prototype.update = function(delta) {
    this.typer.update(delta);
  };

  Block.prototype.onResize = function() {
    this.domElement.style.fontSize = Math.round(Math.min(this.container.offsetWidth, this.container.offsetHeight) / 5.8) + 'px';
    this.pane.position();
  };

  var Pane = function() {

    this.domElement = document.createElement('div');
    this.domElement.classList.add('pane');

    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('wrapper');

    // This is used to do vertical text centering.
    this.wrapper2 = document.createElement('div');
    this.wrapper2.classList.add('wrapper2');

    this.input = document.createElement('span');
    this.input.classList.add('input');



    this.beam = document.createElement('span');
    this.beam.classList.add('beam');

    // this.input.innerText =" this is test";

    this.domElement.appendChild(this.wrapper);
    this.wrapper.appendChild(this.wrapper2);
    this.wrapper2.appendChild(this.input);

    this.input.appendChild(this.beam);

    this.blinker = new Blinker(this.beam);

    this.isClear = true;
    this.centeringTransitionEnabled = true;

    this.lastCharacter = undefined;


  };

  Pane.prototype.addCharacters = function(c) {

    // Hack for this bug: http://returns.hawttrends.appspot.com/
    if (this.lastCharacter == ' ') {
      var _this = this;
      this.beam.style.display = 'none';
      _.defer(function() {
        _this.beam.style.display = 'inline-block';
      });
    }

    this.text.innerHTML += c;
    if (this.wrapper.style.opacity != 1) this.wrapper.style.opacity = 1;
    this.position();

    if (this.isClear) {
      this.isClear = false;
      this.enableCenteringTransition();
    }

    this.lastCharacter = c;

  };

  Pane.prototype.disableCenteringTransition = function() {
    this.centeringTransitionEnabled = false;
    this.wrapper2.classList.remove('transition');
  };

  Pane.prototype.enableCenteringTransition = function() {
    var _this = this;
    _.defer(function() {
      _this.centeringTransitionEnabled = true;
      _this.wrapper2.classList.add('transition');
    })
  };

  Pane.prototype.clear = function() {
    this.lastCharacter = undefined;
    this.disableCenteringTransition();
    this.isClear = true;
  };

  Pane.prototype.position = function() {
    var h = this.input.offsetHeight;
    if (h != this.lastInputHeight) {
      if (this.centeringTransitionEnabled)
        transitionOffset(this.wrapper2, 0, -~~(h / 2) + 'px', undefined, 400);
      else
        setOffset(this.wrapper2, 0, -~~(h / 2) + 'px');
    }
    this.lastInputHeight = h;
  };

  window.Block = Block;

})();