// Randomized prim's Algorithm
var size    = 10;
var wwall   = 5;
var wblock  = 20;
var maze      = [];
var wall_list = [];
var current   = 0;

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
      // x-direction = size
  		let temp = new gen(x, y); 
  		maze.push(temp);  
  	}
  }
  current = maze[0];
  current.add_walls();
  xprev.push(xcurr);
  yprev.push(ycurr);
}

function draw() {
  background(0);
  for(let i = 0; i < maze.length; i++){
  	maze[i].show();
  }
  if(current){
  	current.visited = true;
  	current.add_walls();
  	current.highlight();
  }
  if(wall_list.length > 0){
  	var ran  = floor(random(0, wall_list.length));
	  let next = get_next(wall_list[ran]);  
  	current  = next;
  	wall_list.splice(ran,1);
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