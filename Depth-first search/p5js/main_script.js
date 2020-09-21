var col        = 12;
var row        = 12;
var w          = 20;
var grid       = [];
var current;
var stack      = [];

var xcurr      = w/2;
var ycurr      = w/2;
var xprev      = [];
var yprev      = [];
var inc        = 3*w/8;

function setup() {
  createCanvas(col*w, row*w);
    for(let y=0; y<row; y++){
    	// y-direction = Rows
  		for(let x=0; x<col; x++){
  			// x-direction = columns
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
  background(150);
  for(let i=0; i<grid.length; i++){
  	grid[i].show();
  }
  strokeWeight(3)
  stroke(32)
  line(0    , 0    , row*w,     0);
  line(0    ,     0,     0, col*w);
  line(row*w, 0    , row*w, col*w);
  line(0    , col*w, row*w, col*w);
  if(stack.length > 0){
  	 current.visited = true;
	    current.highlight();
	     var next = current.check_neighbours();

	      if(next){
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
	if(x < 0 || x > row || y < 0 || y > col){
		return undefined;
	}
	return x + y*row;
}

function keyPressed() {
	check_key();
	return false
}


