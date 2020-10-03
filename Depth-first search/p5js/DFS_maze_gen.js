class gen{
	constructor(temp_x, temp_y){
		this.x       = temp_x;
		this.y       = temp_y;
		this.walls   = [true, true, true, true];
		this.visited = false;
		let ind      = index(temp_x, temp_y)*4;
		this.wallnum = [ind , ind + 1, ind + 2, ind + 3];
	}

	show(){
		let x = this.x*(wblock) + (this.x + 1)*(wwall);
		let y = this.y*(wblock) + (this.y + 1)*(wwall);
		fill(255);
		noStroke();
		if(!this.walls[0]){
			rect(x, y, wblock, wwall);	
		}
		if(!this.walls[1]){
			rect(x+wblock, y, wwall, wblock);
		}
		if(!this.walls[2]){
			rect(x, y+wblock, wblock, wwall);
		}
		if(!this.walls[3]){
			rect(x, y, wwall, wblock);
		}	
		if(this.visited){
			noStroke();
			fill(255);
			rect(x, y, wblock, wblock);
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
		let x = this.x*(wblock) + (this.x + 1)*(wwall);
		let y = this.y*(wblock) + (this.y + 1)*(wwall);
		noStroke();
		fill(0, 100, 255);
		rect(x, y, wblock-1, wblock-1);
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