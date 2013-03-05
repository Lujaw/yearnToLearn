var SnakeGame = function(canvas){
  var NORTH = 1, EAST  = 2, SOUTH = 4, WEST = 8, HEAD = 16, TAIL =32,
      CELL_SIZE = 20, 
      PI = Math.PI, 
      MAX_X = 30, MAX_Y = 20,
      FOOD_GROWTH = 5;
  
  // Canvas and Drawing Context
  var canvas = $(canvas)[0],
      ctx = canvas.getContext('2d');

  
  var snakeBits = [],   // Position of each bit of snake
      heading,          // Current heading  (N/S/E/W)
      bitsToGrow = 5,   // Number of bit left to grow
      timer,            // Game Loop
      food;             // Current food position
      
  
  function bit(x, y){
    return {x: x, y: y};
  }
      
  function startGame(){
    heading = EAST,
    snakeBits.unshift(bit(4,4));
    
    placeFood();
    
    // clearInterval(timer);
    //     timer = setInterval(gameLoop, 100);
  }
  
  function gameLoop(){
    advanceSnake();
    checkCollision();
    drawCanvas();
    drawSnake();
    drawFood();
    printSnake();
  }
  
  function printSnake(){
    html = ""
    for(var i=0; i < snakeBits.length; i++){
      html += "<li>( "+snakeBits[i].x+" , "+snakeBits[i].y+" )</li>"
    }
    $('#debug ol').html(html)
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
        snakeBits.unshift(bit(head.x, head.y - 1));
        break;
      case SOUTH:
        snakeBits.unshift(bit(head.x, head.y + 1));
        break;
      case EAST:
        snakeBits.unshift(bit(head.x + 1, head.y));
        break;
      case WEST:
        snakeBits.unshift(bit(head.x - 1, head.y));
        break;
    }
    
    
    checkFood();
    
    if(0 === bitsToGrow){
      // No growth needed, chop tip of tail
      snakeBits.pop();
    }else {
      // Leave old tip of tail for growth and
      // decrement bitsToGrow
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
    if(food.x == snakeBits[0].x && food.y == snakeBits[0].y){
      // Head is on food
      
      // Initiate Growth
      bitsToGrow = FOOD_GROWTH;
      
      // Replace Food
      placeFood();
    }
  }
  
  function placeFood(){
    var x = Math.round(Math.random() * (MAX_X - 1)),
        y = Math.round(Math.random() * (MAX_Y - 1));
        
    // Check for snake collision
    if(inSnake(x, y, true)) return placeFood();
    
    food = {x:x, y:y};
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
  function drawCanvas(){
    ctx.clearRect(0,0, canvas.width, canvas.height);
    ctx.globalAlpha = 0.5;
    ctx.globalAlpha = 1;
    
    
    drawGrid();
  };
  
  function drawGrid(){
    ctx.beginPath()
    ctx.moveTo(0,0);
    for(x=0; x < MAX_X; x++){
      ctx.lineTo(x*CELL_SIZE, MAX_Y*CELL_SIZE);
      ctx.moveTo((x+1)*CELL_SIZE, 0);
    }
    
    ctx.moveTo(0,0);
    for(y=0; y < MAX_Y; y++){
      ctx.lineTo(MAX_X*CELL_SIZE, y*CELL_SIZE);
      ctx.moveTo(0, (y+1)*CELL_SIZE);
    }
    ctx.stroke();
  }
  
  
  function drawInCell(cellX, cellY, fn){
    var x = cellX * CELL_SIZE,
        y = cellY * CELL_SIZE;
        
    ctx.save();
    ctx.translate(x, y);
    fn();
    ctx.restore();
  }
  
  
  // Draws one segment of the snake
  function drawBit(bit){
    drawInCell(bit.x, bit.y, function(){
      ctx.beginPath();
      
      /*ctx.arc(CELL_SIZE/2, CELL_SIZE/2, 
              CELL_SIZE/2, 0, 2*PI, true);
      */        
      
      ctx.rect(0,0, CELL_SIZE, CELL_SIZE)
      ctx.fill();
    });
  };
  

  
  function drawFood(){
    drawInCell(food.x, food.y, function(){
      ctx.fillStyle = "orange";      
      ctx.beginPath();
      ctx.arc(CELL_SIZE/2, CELL_SIZE/2, 
              CELL_SIZE/2 , 0, 2*PI, true);
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
    if(e.keyCode == 81){ // "Q"
      gameLoop();
    }
    if(KEYS[e.keyCode]){
      heading = KEYS[e.keyCode];
      e.preventDefault();
    }
  })
    
  return {
    start: startGame
  }
    
};

$(function(){
  window.game = SnakeGame('#canvas');
  game.start();
})
  
  
