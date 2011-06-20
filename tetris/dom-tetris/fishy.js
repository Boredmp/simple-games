$(document).ready(function(){
    var ctx = $('#fishy')[0].getContext('2d');
    var WIDTH = 800;
    var HEIGHT = 600;

    var Grid = function(width, height, interval, offset){
	this.width = width;
	this.height = height;
	this.interval = interval;
	this.offset = offset;

	function include(arr,obj){
	    return (arr.indexOf(obj) != -1);
	}
	function create_coord(){
	    var grid = [];
    	    for (var i=0; i<(width/interval); i++) {
		grid.push([]);
		for (var j=0; j<(height/interval); j++) {
	    	    grid[i][j] =[(i*interval)+offset, (j*interval)+offset];
		}	    
    	    }
	    return grid;
	}
	this.coord = create_coord();
	this.get_x = function(){
	    var x_coord = [];
	    for (var i=0; i<this.coord.length; i++){
		x_coord.push(this.coord[i][0][0]);
	    }
	    return x_coord;
	};
	this.get_y = function(){
	    var y_coord = [];
	    for (var i=0; i<this.coord[0].length; i++){
		y_coord.push(this.coord[0][i][1]);
	    }
	    return y_coord;
	};
	this.x_coord = this.get_x();
	this.y_coord = this.get_y();
	this.x_ongrid = function(x){
	    var on=include(this.x_coord, x);  
	    console.log(this.x_coord, x);
	    return on;
	};
	this.y_ongrid = function(y){
	    var on=include(this.y_coord, y);  
	    console.log(this.y_coord, y);
	    return on;
	};
	this.draw = function(){
	    ctx.strokeStyle="#grey";
	    for (var i=0; i<this.coord.length; i++){
		ctx.beginPath();
		ctx.moveTo(this.coord[i][0][0], this.coord[i][0][1]);
		for (var j=0; j<this.coord[i].length; j++){
		    ctx.lineTo(this.coord[i][j][0], this.coord[i][j][1]);
		}
		ctx.stroke();
	    }
	    for (i=0; i<this.coord[0].length; i++){
		ctx.beginPath();
		ctx.moveTo(this.coord[0][i][0], this.coord[0][i][1]);
		for (var j=0; j<this.coord.length; j++){
		    ctx.lineTo(this.coord[j][i][0], this.coord[j][i][1]);
		}
		ctx.stroke();
	    }
	};
    };

    var Background = function(){
	this.draw = function(){
	    ctx.fillStyle = "#blue";
	    ctx.fillRect(0,0,WIDTH,HEIGHT)
	};
    };

    var Sprite = function(x,y,r,grid){
	this.grid = grid;
	this.center = [x,y];
	this.radius = r;
	this.upper_boundary = this.radius;
	this.lower_boundary = HEIGHT - this.radius;
	this.direction = 'UP';
	this.new_direction = 'UP';
	this.speed = 20;
	this.step = 5;
	this.draw = function(){
	    ctx.fillStyle = "#yellow";
	    ctx.beginPath();
	    ctx.arc(this.center[0],this.center[1],this.radius,0,6.3,false);
	    ctx.closePath();
	    ctx.fill();
	};	

	// Direction 'row' or 'col'
	this.snap_to_grid = function(direction){
	    if (direction === 'row'){
		console.log(this.center[1]);
		for (var i=0; i<this.grid.y_coord.length; i++){
		    if (true) {
			console.log(this.grid.y_coord[i]);
		    }
		    
		    // console.log(this.grid.y_coord[i], this.center[0]);
		    // console.log(this.grid.y_coord);
		    // if ((Math.abs(this.grid.y_coord[i]-this.center[0])<50)) {
		    // 	console.log(this.center[0]);
		    // 	this.center[0] = this.grid.y_coord[i];
		    // 	console.log('changed?', this.grid.y_coord[i], this.center[1]);
		    // 	return true;
		    // }
		    // if ((this.center[1]-this.grid.y_coord[i])<this.step) {
		    // 	this.center[1] = this.grid.y_coord[i];
		    // 	return true;
		    // }
		    // else return false;
		}
	    }
	};

	this.move = function(){
	    if (this.new_direction != this.direction){
		console.log(this.grid.y_coord);
	    	if (this.new_direction == 'LEFT' || 'RIGHT'){
		    var change = this.snap_to_grid('row');
		    console.log('change');
	    	    this.direction = this.new_direction;
	    	}
	    	else if (this.new_direction == 'DOWN' || 'UP'){
		    this.direction = this.new_direction;		
		}
	    }
	    // if (this.direction == 'UP' && this.grid.y_ongrid(this.center[0])) {
	    // 	this.center[1] -= this.step;
	    // }

	    if (this.direction == 'UP') this.center[1] -= this.step;
	    else if (this.direction == 'DOWN') this.center[1] += this.step;
	    else if (this.direction == 'LEFT') this.center[0] -= this.step;
	    else if (this.direction == 'RIGHT') this.center[0] += this.step;

	    if (this.center[1] < this.upper_boundary) this.center[1] = this.upper_boundary;
	    if (this.center[1] > this.lower_boundary) this.center[1] = this.lower_boundary;
	};
    };
    
    var Game = function(){
	    this.draw = function(bg, sprites){
		for (var i=0; i<bg.length; i++){
		    bg[i].draw();
		}
		for (i=0; i<sprites.length; i++){
		    sprites[i].draw();
		}
	    };
	    this.move = function(sprites){
		for (var i=0; i<sprites.length; i++){
		    sprites[i].move();
		}
	    };
	    this.animate = function(bg, sprites){
		this.move(sprites);
		this.draw(bg,sprites);
	    };
	    this.check_keys= function(evt){
		if (evt.keyCode == 81) return 'QUIT';
		else if (evt.keyCode == 39) return 'RIGHT';
		else if (evt.keyCode == 37) return 'LEFT';
		else if (evt.keyCode == 38) return'UP';
		else if (evt.keyCode == 40) return 'DOWN';
		else return false;
	    };
	};

	var fishes = [];
	var bg = [];
	// var water = new Background();
	// bg.push(water);
	var grid = new Grid(WIDTH, HEIGHT, 20,10);
	var player = new Sprite(grid.coord[15][15][0],grid.coord[15][15][1],20,grid);
	fishes.push(player);

	var game = new Game();
	function main() {
	    function run() {
		var go = setInterval(function() {
	    	    $(document).keydown(function(evt){
	    		var key = game.check_keys(evt);
	    		if (key === 'QUIT') {
	    		    clearInterval(go);
	    		}
	    		else if (key) {
	    		    player.new_direction = key;
	    		    evt.preventDefault();
	    		}
	    	    });
		    grid.draw();
	    	    game.animate(bg, fishes);		
		}, player.speed);
	    }
	    run();
	}
	main();
    });


