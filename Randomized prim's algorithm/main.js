var col       = 10;
var row       = 10;
var w         = 10;
var maze      = [];
var wall_list = [];
var current   = 0;

var xcurr      = w/2;
var ycurr      = w/2;
var xprev      = [];
var yprev      = [];
var inc        = 3*w/8;

function setup() {
  createCanvas(col*w, row*w);
  for(let y = 0; y < row; y++){
  	for(let x = 0; x < col; x++){
  		let temp = new gen(x, y); 
  		maze.push(temp);  
  	}
  }
  current = maze[0];
  current.add_walls();
}

function draw() {
  background(150);
  stroke(255)
  line(0,1,col*w,1)
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
	if(x < 0 || x > row || y < 0 || y > col){
		return undefined;
	}
	return x + y*row;
}

function keyPressed() {
	check_key();
	return false
}