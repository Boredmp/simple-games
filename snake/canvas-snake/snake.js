$(document).ready(function() {
    var ctx = $("#snake")[0].getContext('2d');
    var SEGMENT_LEN = 10;
    var FIELD_LEN = 500;

    function make_grid() {
    	// SEGMENT_LEN + 1 needs to divide evenly into FIELD_LEN
	var grid = [];
    	for (var i=0; i<FIELD_LEN; i += (SEGMENT_LEN)) {
	    for (var j=0; j<FIELD_LEN; j += (SEGMENT_LEN)) {
		grid.push([i,j]);
	    }	    
    	}
	return grid;
    }

    var GRID = make_grid();

    function level() {
	var left = [], right=[], top=[], bottom=[];
	var wall1=[],wall2=[],wall3=[],wall4=[];
	for (var i=0; i<50; i++) {
	    left.push(i);
	}
	for (i=2450; i<2500; i++) {
	    right.push(i);
	}
	for (i=50; i<2450; i+=50) {
	    top.push(i);
	}
	for (i=99; i<2500; i+=50) {
	    bottom.push(i);
	}
	for (i=0; i<3; i++) {
	    for (var j=(315+(50*i)); j<(315+(50*i) + 20); j++) {
		wall1.push(j);
	    }
	}

	for (i=0; i<3; i++) {
	    for (var j=(2015+(50*i)); j<(2015+(50*i) + 20); j++) {
		wall2.push(j);
	    }
	}

	for (i=0; i<3; i++) {
	    for (var j=(807+(50*i)); j<(807+(50*i) + 10); j++) {
		wall3.push(j);
	    }
	}

	for (i=0; i<3; i++) {
	    for (var j=(883+(50*i)); j<(883+(50*i) + 10); j++) {
		wall3.push(j);
	    }
	}

	for (i=0; i<3; i++) {
	    for (var j=(1507+(50*i)); j<(1507+(50*i) + 10); j++) {
		wall4.push(j);
	    }
	}

	for (i=0; i<3; i++) {
	    for (var j=(1583+(50*i)); j<(1583+(50*i) + 10); j++) {
		wall4.push(j);
	    }
	}


	return left.concat(right,top,bottom,wall1,wall2,wall3,wall4);
    }

    function clear(){
	ctx.fillStyle ='#569996';
	ctx.fillRect(0,0,FIELD_LEN,FIELD_LEN);
    }

    function include(arr,obj){
	return (arr.indexOf(obj) != -1);
    }

    var Snake = function() {
	this.body = [];
	this.direction = 'UP';
	this.speed = null;
	this.food = [];
	this.tail = null;

	function segment(i) {
	    ctx.fillStyle ='#34ad29';
	    ctx.fillRect(GRID[i][0],GRID[i][1],SEGMENT_LEN,SEGMENT_LEN);
	    ctx.strokeRect(GRID[i][0],GRID[i][1],SEGMENT_LEN,SEGMENT_LEN);
	};
	function draw_food(i){
	    ctx.fillStyle ='#fff200';
	    ctx.fillRect(GRID[i][0],GRID[i][1],SEGMENT_LEN,SEGMENT_LEN);
	    ctx.strokeRect(GRID[i][0],GRID[i][1],SEGMENT_LEN,SEGMENT_LEN);
	}
	function draw_walls(i){
	    ctx.fillStyle ='#4f4f4f';
	    ctx.fillRect(GRID[i][0],GRID[i][1],SEGMENT_LEN,SEGMENT_LEN);
	    ctx.strokeRect(GRID[i][0],GRID[i][1],SEGMENT_LEN,SEGMENT_LEN);
	}

	this.head = function(i) {
	    if (this.direction == 'UP') return (i-1);
	    else if (this.direction == 'DOWN') return (i+1);
	    else if (this.direction == 'LEFT') return (i-(FIELD_LEN/SEGMENT_LEN));
	    else if (this.direction == 'RIGHT') return (i+(FIELD_LEN/SEGMENT_LEN));
	    else return false;
	};

	this.points = null;
	this.score = function() {
	    this.points += 100 + ((79-this.speed) * 10 );
	    $('#score').text(this.points);
	};

	this.eat = function() {
	    if (include(this.food, this.body[0])) {
	    	this.body.push(this.tail);
		this.food=[];
		if (this.speed>1) this.speed -= 1;
		else this.speed=1;
		this.score();
		return true;
	    }
	    else return false;
	};
	
	this.crash = function(head) {
	    if (include(this.body, head)){
		return true;
	    } else if (include(this.walls, head)){
		return true;
	    } else return false;
	};

	this.draw = function() {
	    clear();
	    for (var i=0, len=this.body.length; i<len; i++){
		segment(this.body[i]);
	    }
	    for (i=0, len=this.food.length; i<len; i++){
		draw_food(this.food[i]);
	    }
	    for (i=0, len=this.walls.length; i<len; i++){
		draw_walls(this.walls[i]);
	    }

	};
	
	this.move = function() {
	    var head = this.head(this.body[0]);
	    var crash = this.crash(head);
	    if (crash) return 2;
	    this.body.unshift(head);
	    this.tail = this.body.pop();
	    var eat = this.eat();
	    if (eat) return 1;
	    this.draw();
	    return false;
	};
    };

    function check_keys(evt){
	if (evt.keyCode == 81) return 'QUIT';
	else if (evt.keyCode == 39) return 'RIGHT';
	else if (evt.keyCode == 37) return 'LEFT';
	else if (evt.keyCode == 38) return'UP';
	else if (evt.keyCode == 40) return 'DOWN';
	else return false;
    }

    function make_food(walls){
	var food = Math.floor(Math.random() * (GRID.length-1));
	if (include(walls, food)){
	    make_food();
	}
	return food;
    }

    function make_snake(snake, start){
	for (var i=0; i<7; i++) {
	    var segment = snake.head(start);
	    snake.body.push(segment);
	}
    }

    function main(snake){
	function run() {
	    var go = setInterval(function() {
		$(document).keydown(function(evt){
		    var key = check_keys(evt,snake.direction);
		    if (key == 'QUIT') {
			clearInterval(go);
		    }
		    else if (snake.direction=='UP' && key=='DOWN' || snake.direction=='DOWN' && key=='UP' || snake.direction=='LEFT' && key=='RIGHT' || snake.direction=='RIGHT' && key=='LEFT') {
			evt.preventDefault();
		    }
		    else if (key) {
			snake.direction = key;
			evt.preventDefault();
		    }
		});
		if (snake.food.length < 1) snake.food.push(make_food(snake.walls));
		var action = snake.move();
		if (action == 1) {
		    clearInterval(go);
		    run();
		}
		if (action == 2) {
		    clearInterval(go);
		}
	    }, snake.speed);
	}
	run();
    };

    function init(speed){
	var snake = new Snake;
	snake.walls = level();
	snake.speed = speed;
	snake.direction = 'UP';
	make_snake(snake, 540);
	main(snake);
    }

    function screenshot() {
	var snake = new Snake;
	snake.walls = level();
	make_snake(snake, 540);
	snake.draw();
	
    }

    $('#easy').click(function() {
	init(80);
    });
    $('#normal').click(function() {
	init(60);
    });
    $('#hard').click(function() {
	init(40);
    });

    screenshot();
});