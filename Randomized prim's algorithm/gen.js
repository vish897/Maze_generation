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
		var x = this.x*w;
		var y = this.y*w;
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
			line(x, y+w, x, y);
		}	
		if(this.visited){
			noStroke();
			fill(51);
			rect(x, y, w, w);
		}
	}

	add_walls(){
		if(this.walls[0] && this.y != 0){
			wall_list.push(this.wallnum[0]);
		}
		if(this.walls[1] && this.x != row - 1){
			wall_list.push(this.wallnum[1]);
		}
		if(this.walls[2] && this.y != col-1){
			wall_list.push(this.wallnum[2]);
		}
		if(this.walls[4] && this.x != 0){
			wall_list.push(this.wallnum[3]);
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


function get_next(wallind){
	let ci = maze[floor(wallind/4)];
	let w  = wallind%4;
	let nx = 0;
	let ny = 0;
	if(w == 0){
		nx = ci.x;
		ny = ci.y - 1;
	} else if(w == 1){
		nx = ci.x + 1;
		ny = ci.y;
	} else if(w == 2){
		nx = ci.x;
		ny = ci.y + 1;
	} else if(w == 3){
		nx = ci.x - 1;
		ny = ci.y;
	}
	let ni  = maze[index(nx, ny)];
	if((!ni.visited && ci.visited) || (ni.visited && !ci.visited)){
		ci.walls[w]       = false;
		ni.walls[(w+2)%4] = false;
		return ni;
	}
	else{
		return undefined;
	}
}

