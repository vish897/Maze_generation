class gen{
	constructor(temp_x, temp_y){
		this.x       = temp_x;
		this.y       = temp_y;
		this.walls   = [true, true, true, true];
		this.visited = false;
	}

	show(){
		var x = this.x*w;
		var y = this.y*w;
		strokeWeight(1.5);
		stroke(255);
		if(this.walls[0]){
			line(x, y, x+w, y);	
		}
		if(this.walls[1]){
			line(x+w, y, x+w, y+w);
		}
		if(this.walls[2]){
			line(x+w, y+w, x, y+w);
		}
		if(this.walls[3]){
			line(x, y+w, x,y);
		}	
		if(this.visited){
			noStroke();
			fill(51);
			rect(x, y, w, w);
		}
	}

	check_neighbours(){
		var neighbours = [];
		var top        = grid[index(this.x    , this.y - 1)]
		var right      = grid[index(this.x + 1, this.y)]
		var bottom     = grid[index(this.x    , this.y + 1)]
		var left       = grid[index(this.x - 1, this.y)]

		if(top && !top.visited){
			neighbours.push(top);
		}
		if(right && !right.visited){
			neighbours.push(right);
		}
		if(bottom && !bottom.visited){
			neighbours.push(bottom);
		}
		if(left && !left.visited){
			neighbours.push(left);
		}
		if (neighbours.length > 0){
			var r = floor(random(0, neighbours.length));
			return neighbours[r];
		} else{
			return undefined;
		}
	}

	highlight(){
		var x = this.x*w;
		var y = this.y*w;
		noStroke();
		fill(0,255, 0, 100);
		rect(x, y, w, w);
	}
}


function remove_walls(current, next){
	var x = current.x - next.x;
	var y = current.y - next.y;

	if(x === 1){
		current.walls[3] = false;
		next.walls[1]    = false;
	} else if (x === -1) {
		current.walls[1] = false;
		next.walls[3]    = false;
	}

	if(y === 1){
		current.walls[0] = false;
		next.walls[2]    = false;
	} else if (y === -1) {
		current.walls[2] = false;
		next.walls[0]    = false;
	}
}