function check_key(){
	if(keyCode === 80 && keyIsPressed){
		if(xprev.length > 1){
			print("clear")
			stroke(255)
			line(xcurr, ycurr, xprev[xprev.length - 2], yprev[yprev.length - 2]);
			xcurr = xprev[xprev.length - 2];
			ycurr = yprev[yprev.length - 2];
			xprev.pop();
			yprev.pop();
		}
	} else if(keyCode === 67 && keyIsPressed && xprev.length != 0){
		print("Erase full path");
		xprev = [];
		yprev = [];
		xcurr   = wwall + (wblock/2);
		ycurr   = wwall + (wblock/2);
		xprev.push(xcurr);
    	yprev.push(ycurr);
		clear();
		background(0);
		for(let i=0; i<grid.length; i++){
		 	grid[i].show();
	    }

	} else{
		if(keyCode === 65 && keyIsPressed){
			// Left arrow
			print("left")
			xcurr -= inc;
		}
		if(keyCode === 87 && keyIsPressed){
			// Up arrow
			print("up")
			ycurr -= inc;
		}
		if(keyCode === 68 && keyIsPressed){
			// Right arrow
			print("right")
			xcurr += inc;
		}
		if(keyCode === 83 && keyIsPressed){
			// Down arrow
			print("down")
			ycurr += inc;
		}
		let q = is_on_border(xprev[xprev.length -1], yprev[yprev.length -1]);
		print(q)
		if(q == 2){
			stroke(0, 0, 255);
			strokeWeight(1.5)
			line(xprev[xprev.length -1], yprev[yprev.length -1], xcurr, ycurr);
			xprev.push(xcurr);
			yprev.push(ycurr);
		} else{
			xcurr = xprev[xprev.length -1];
			ycurr = yprev[yprev.length -1];
		}
	}
}


function is_on_border(xp, yp){
	let len = wblock + wwall;
	var cx = floor(xcurr/len);
	var cy = floor(ycurr/len);
	var gc = index(cx, cy);
	var px = floor(xp/len);
	var py = floor(yp/len);
	var gp = index(px, py);
	if(gp - gc != 0){
		let cmpx = px - cx;
		let cmpy = py - cy;
		if(cmpx == 1  && grid[gp].walls[3] == true){
			return 1;
		} else if(cmpx == -1 && grid[gp].walls[1] == true){
			return 1;
		} else if(cmpy == 1 && grid[gp].walls[0] == true){
			return 1;
		} else if(cmpy == -1 && grid[gp].walls[2] == true){
			return 1;
		} else{
			return 2;
		}
	} else{
		return 2;
	}
}