var size    = 10;
var wwall   = 5;
var wblock  = 20;    
var grid    = [];
var current;
var stack   = [];

var xcurr   = wwall + (wblock/2);
var ycurr   = wwall + (wblock/2);
var xprev   = [];
var yprev   = [];
var inc     = 3*wblock/8;

function setup() {
  let len = size*wblock + (size + 1)*wwall;
  createCanvas(len, len);
  for(let y = 0; y < size; y++){
      // y-direction = sizes
      for(let x = 0; x < size; x++){
        // x-direction = sizeumns
        var temp = new gen(x, y);
        grid.push(temp);
      }
    }
    current = grid[0];
    stack.push(current);
    xprev.push(xcurr);
    yprev.push(ycurr);
}

function draw() {
  background(0);
  for(let i=0; i<grid.length; i++){
    grid[i].show();
  }
  if(stack.length > 0){
    current.visited = true;
  var next = current.check_neighbours();
  if(next){
    current.highlight();
      stack.push(current);
      next.visited = true;
        remove_walls(current, next);
        current      = next;
    } else{
      current = stack.pop();
    }
  } else{
      noLoop();
  }
}

function index(x, y){
  if(x < 0 || x > size || y < 0 || y > size){
    return undefined;
  }
  return x + y*size;
}

function keyPressed() {
  check_key();
  return false
}


