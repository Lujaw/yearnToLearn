var Snake = function(canvas){
  var NORTH = 1, EAST  = 2, SOUTH = 4, WEST = 8, HEAD = 16, TAIL =32,
      CELL_SIZE = 20, 
      PI = Math.PI, 
      MAX_X = 30, MAX_Y = 20;
  
  // Canvas and Drawing Context
  var canvas = $(canvas)[0],
      ctx = canvas.getContext('2d'),
      background = new Image();
      background.src = "images/grass.jpg"
  
  var snakeBits = [],   // Position of each bit of snake
      heading,          // Current heading  (N/S/E/W)
      bitsToGrow = 5,   // Number of bit left to grow
      timer,            // Game Loop
      food;             // Current food position
      
  
  function bit(x, y, prev, next){
    return {x: x, y: y, prev: prev, next: next};
  }
      
  function startGame(){
    heading = EAST,
    snakeBits.unshift(bit(4,4,null,null));
    placeFood();
    
    clearInterval(timer);
    timer = setInterval(gameLoop, 100);
  }
  
  function gameLoop(){
    advanceSnake();
    checkCollision();
    clearCanvas();
    drawSnake();
    drawFood();
  }
  
  function gameOver(){
    //alert('Game Over');
    clearInterval(timer)
  }
  
  // Advances Snake's Position
  function advanceSnake(){
    var head = snakeBits[0];
    switch(heading){
      case NORTH:
        snakeBits.unshift(bit(head.x, head.y - 1, SOUTH));
        snakeBits[1].next = NORTH;
        break;
      case SOUTH:
        snakeBits.unshift(bit(head.x, head.y + 1, NORTH));
        snakeBits[1].next = SOUTH;
        break;
      case EAST:
        snakeBits.unshift(bit(head.x + 1, head.y, WEST));
        snakeBits[1].next = EAST;
        break;
      case WEST:
        snakeBits.unshift(bit(head.x - 1, head.y, EAST));
        snakeBits[1].next = WEST;
        break;
    }
    
    checkFood();
    
    
    if(0 === bitsToGrow){
      snakeBits.pop();
      snakeBits[snakeBits.length-1].prev = 0;
    }else {
      bitsToGrow--;
    }
  }
  
  function checkCollision(){
    var head = snakeBits[0], 
        i, length;
    
    // Check out of bounds or snake crossover
    if(head.x < 0 || head.x >= MAX_X ||
       head.y < 0 || head.y >= MAX_Y || 
       inSnake(head.x, head.y, false) )
    {
      gameOver();
    }
        
  }
  
  function checkFood(){
    if(food[0] == snakeBits[0].x && food[1] == snakeBits[0].y){
      bitsToGrow = 5;
      placeFood();
    }
  }
  
  function placeFood(){
    var x = Math.round(Math.random() * (MAX_X - 1)),
        y = Math.round(Math.random() * (MAX_Y - 1));
        
    // Check for snake collision
    if(inSnake(x, y, true)) return placeFood();
    
    food = [x, y];
  }
  
  function inSnake(x, y, includeHead){
    var length = snakeBits.length,
        i = includeHead ? 0 : 1;
    for(; i < length; i++ ){
      if(x == snakeBits[i].x && y == snakeBits[i].y)
        return true;
    }
    return false
  }
  
  // Clears canvas of all shapes and fills
  function clearCanvas(){
    ctx.clearRect(0,0, canvas.width, canvas.height);
    ctx.globalAlpha = 0.5;
    ctx.drawImage(background, 0, 0);
    ctx.globalAlpha = 1;
  };
  
  
  function drawInCell(cellX, cellY, fn){
    var x = cellX * CELL_SIZE + 0.5 * CELL_SIZE,
        y = cellY * CELL_SIZE + 0.5 * CELL_SIZE;
        
    ctx.save();
    ctx.translate(x, y);
    fn();
    ctx.restore();
  }
  
  
  // Draws one segment of the snake
  function drawBit(bit){
    drawInCell(bit.x, bit.y, function(){
      ctx.beginPath();
      switch(bit.next | bit.prev){
        
        // Straight 
        case NORTH | SOUTH:
          ctx.rotate(-PI/2)
        case EAST | WEST:
          ctx.rect(-CELL_SIZE/2, 
                   -CELL_SIZE/2 + 1, 
                    CELL_SIZE, 
                    CELL_SIZE -2)
          break;
        
        // Bends
        case SOUTH | WEST:
          ctx.rotate(PI/2);
        case SOUTH | EAST:
          ctx.rotate(PI/2);
        case NORTH | EAST:
          ctx.rotate(PI/2);
        case NORTH | WEST:
          ctx.moveTo(-CELL_SIZE/2, -CELL_SIZE/2);
          ctx.arc(-CELL_SIZE/2, -CELL_SIZE/2, CELL_SIZE - 1, 0, PI/2, false);
          break;
        
        // HEAD/TAIL  
        case WEST:
          ctx.rotate(PI/2);
        case SOUTH:
          ctx.rotate(PI/2);
        case EAST:
          ctx.rotate(PI/2);
        case NORTH:
          ctx.arc(0, 0, CELL_SIZE/2 - 2, PI, 0, true);
          ctx.lineTo(CELL_SIZE/2 - 1, -CELL_SIZE/2);
          ctx.lineTo(-CELL_SIZE/2 + 1, -CELL_SIZE/2);
          ctx.closePath();
          break;
        default:
          ctx.arc(0, 0, CELL_SIZE/2, 0, 2*PI, true);
      }
      
      
      
      ctx.fill();
    });
  };
  

  
  function drawFood(){
      
    drawInCell(food[0], food[1], function(){
      ctx.fillStyle = "orange";
      
      ctx.beginPath();
      ctx.arc(0, 0, CELL_SIZE * 0.5, 0, 2*PI, true);
      ctx.fill();
    });
  }
  
  //Draws Snake
  function drawSnake(){
    var i, length = snakeBits.length;
    for(i=0; i < length; i++){
      drawBit(snakeBits[i]);
    }
  }
  
  var KEYS = {37: WEST, 38: NORTH, 39: EAST, 40: SOUTH};
  
  $(window).keydown(function(e){
    if(KEYS[e.keyCode]){
      console.log('huh');
      heading = KEYS[e.keyCode];
    }
  })
    
  return {
    start: startGame
  }
    
};

$(function(){
  window.snake = new Snake('#canvas');
  snake.start();
})
  
  
