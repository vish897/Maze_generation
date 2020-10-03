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

	add_walls(){
		if(this.walls[0] && this.y != 0){
			wall_list.push(this.wallnum[0]);
		}
		if(this.walls[1] && this.x != size - 1){
			wall_list.push(this.wallnum[1]);
		}
		if(this.walls[2] && this.y != size-1){
			wall_list.push(this.wallnum[2]);
		}
		if(this.walls[4] && this.x != 0){
			wall_list.push(this.wallnum[3]);
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

