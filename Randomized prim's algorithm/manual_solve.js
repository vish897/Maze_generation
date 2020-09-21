function check_key(){
	if(keyCode === 80 && keyIsPressed && xprev.length != 0){
		print("clear")
		xprev.pop();
		yprev.pop();
		stroke(31)
		line(xcurr, ycurr, xprev[xprev.length -1 ], yprev[yprev.length -1]);
		xcurr = xprev[xprev.length -1 ];
		ycurr = yprev[yprev.length -1]
	} else if(keyCode === 67 && keyIsPressed && xprev.length != 0){
		print("Erase full path");
		xprev = [];
		yprev = [];
		xcurr = w/2;
		ycurr = w/2;
		xprev.push(xcurr);
    	yprev.push(ycurr);
		clear();
		background(0);
		  for(let i=0; i<maze.length; i++){
		  	maze[i].show();
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
		if(q != 1){
			stroke(255);
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
	var cx = floor(xcurr/w);
	var cy = floor(ycurr/w);
	var gc = index(cx, cy);
	var px = floor(xp/w);
	var py = floor(yp/w);
	var gp = index(px, py);
	if(gp - gc != 0){
		let cmpx = px - cx;
		let cmpy = py - cy;

		if((cmpx == 1 || xcurr == (cx + 1)*w) && maze[gp].walls[3] == true){
			print("here1");
			return 1;
		} else if((cmpx == -1 || xcurr == cx*w) && maze[gp].walls[1] == true){
			print("here2");
			return 1;
		} else if((cmpy == 1 || ycurr == (cy + 1)*w) && maze[gp].walls[0] == true){
			print("here3");
			return 1;
		} else if((cmpy == -1 || ycurr == cy*w) && maze[gp].walls[2] == true){
			print("here4");
			return 1;
		}
	} else{
			return 2;
	}
}