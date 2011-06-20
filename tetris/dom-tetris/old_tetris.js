$(document).ready(function() {
    function Block() {
	this.create_blocks = function(){
	    var shape1 = [[[ 0, 1, 1 ], [ 1, 1, 0 ]], [[ 1, 0], [ 1, 1], [ 0, 1]]];
            var shape2 = [[[ 2, 2, 0 ],  [ 0, 2, 2 ]], [[ 0, 2], [ 2, 2], [ 2, 0]]];
            var shape3 = [[[ 0, 0, 3 ],  [ 3, 3, 3 ]], [[ 3, 0], [ 3, 0], [ 3, 3]], [[ 3, 3, 3], [ 3, 0, 0]], [[3, 3], [0, 3], [0, 3]]];
            var shape4 = [[[ 4, 0, 0 ],  [ 4, 4, 4 ]], [[ 4, 4], [ 4, 0], [ 4, 0]], [[ 4, 4, 4], [ 0, 0, 4]], [[ 0, 4], [ 0, 4], [ 4, 4]]];
            var shape5 = [[[ 0, 5, 0 ],  [ 5, 5, 5 ]], [[ 5, 0], [ 5, 5],  [ 5, 0]], [[ 5, 5, 5], [ 0, 5, 0]], [[ 0, 5], [ 5, 5], [ 0, 5]]];
            var shape6 = [[[ 6, 6, 6, 6 ]], [[ 6], [ 6], [ 6],  [ 6]]];
            var shape7 = [[[ 7, 7 ],  [ 7, 7 ]]];
            var blocks = [shape1, shape2, shape3, shape4, shape5, shape6, shape7];
            return blocks;
	};

	this.blocks = this.create_blocks();
	this.current = this.blocks[0][0];
	this.x_pos = 4;
	this.y_pos = 6;

	this.new_block = function(){
	    this.shape = 0;
	    this.rotation = 0;
	    this.current = this.blocks[this.shape][this.rotation];
	    this.x_pos = 4;
	    this.y_pos = 0;
	};

	this.next_rotation = function(){
	    if (this.rotation + 1 > this.blocks[this.shape].length - 1) {
		console.log(this.rotation + 1, this.blocks[this.shape].length - 1);
		console.log('Rotate', this.rotation);
		console.log(this.current);
		return 0;
	    }
	    else {
		console.log('Rotate', this.rotation);
		console.log(this.rotation + 1, this.blocks[this.shape] - 1);
		console.log(this.current);
		return this.rotation+1;
		// return 0;
	    };
	};
    }

    function Grid(rows, cols) {
	this.grid = [];
	this.rows = rows;
	this.cols = cols;
	this.cleared_rows = 0;
	this.score = 0;

	this.create_grid = function(rows, cols) {
	    var new_grid = [];
	    for (var i=0; i<this.rows; i++) {
		var row = [];
		for (var j=0; j<this.cols; j++) {
		    row.push(0);
		}
		new_grid.push(row);
	    }
	    return new_grid;
	};

	var check_rows = function(){
	    
	};

	this.insert_block = function(insert_block){
	    // console.log('insert', insert_block.current);
	    for (var i=0; i<insert_block.current.length; i++ ){
		for (var j=0; j<insert_block.current[i].length; j++){
		    var x = insert_block.x_pos + i;
		    var y = insert_block.y_pos + j;
		    if (insert_block.current[i][j]>0) {
			this.grid[x][y] = insert_block.current[i][j];
		    }
		}
	    }
	};

	this.clear_block = function(old_x, old_y, current_block){
	    for (var i=0; i<current_block.length; i++ ){
		for (var j=0; j<current_block[i].length; j++){
		    var x = old_x + i;
		    var y = old_y + j;
		    if (block.current[i][j] < 10) {
			this.grid[x][y] = 0;
		    }
		}
	    }
	};

	var out_of_bounds_X = function(){
	    
	};

	this.out_of_bounds_Y = function(block, y_pos){
	    if (y_pos + block.current[0].length > this.grid[0].length) {
		return true;
	    }
	    else {return false;};
	};

	var collision_check = function(){
	    
	};
	this.check_rotation = function(block){
	    return false;
	};

	this.cement_block = function(){
	    
	};

	this.drop_block = function(drop_block){
	    // console.log('global?', block.current);
	    // console.log('dropping', drop_block.current);
	    if (this.out_of_bounds_Y(drop_block, drop_block.y_pos+1)){
		this.cement_block(drop_block);
		drop_block.new_block();
		this.insert_block(drop_block);
	    }
	    else {
		var old_x = drop_block.x_pos;
		var old_y = drop_block.y_pos;
		drop_block.y_pos ++;
		this.clear_block(old_x, old_y, drop_block.current);
		this.insert_block(drop_block);
	    }
    	};

	var move_X = function(){
	    
	};
	this.rotate = function(rotate_block){
	    // console.log('Rotating', rotate_block.current);
	    if (this.check_rotation(rotate_block)) {return false;}
	    else {
		this.clear_block(rotate_block.x_pos, rotate_block.y_pos, rotate_block.current);
		rotate_block.rotation = rotate_block.next_rotation();
		rotate_block.current = rotate_block.blocks[rotate_block.shape][rotate_block.rotation];
		this.insert_block(rotate_block);
		return true;
	    };
	};
    };

    function Game(board, block) {
	this.game_board = board;
	this.game_block = block;

	// console.log('game_block', this.game_block.current);

	this.check_keys = function(evt){
	    if (evt.keyCode == 81) return 'QUIT';
	    else if (evt.keyCode == 39) return 'RIGHT';
	    else if (evt.keyCode == 37) return 'LEFT';
	    else if (evt.keyCode == 38) return'UP';
	    else if (evt.keyCode == 40) return 'DOWN';
	    else return false;
	};

	this.draw_new_grid = function(cell_width){
	    var game_div = document.createElement('div');
	    game_div.setAttribute('id', 'game');
	    game_div.style.width = cell_width * this.game_board.rows;
	    game_div.style.height = cell_width * this.game_board.cols;
	    document.getElementById('main').appendChild(game_div);
	    for (var i=0; i<this.game_board.rows; i++) {
	    	for (var j=0; j<this.game_board.cols; j++) {
	    	    var cell = document.createElement('div');
	    	    cell.setAttribute('class', 'empty');
	    	    var current_id = "x" + i + "y" + j;
	    	    cell.setAttribute('id', current_id);
	    	    cell.style.top = (j * cell_width)+1;
	    	    cell.style.left = (i * cell_width)+1;
	    	    game_div.appendChild(cell);
	    	}
	    }
	};

	this.update_grid = function(){
    	    var get_class = function(class_code){
    		var classes = ['empty', 'green'];
    		if (class_code > 9) {
    		    class_code = class_code / 10;
    		}
    		return classes[class_code];
    	    };

	    for (var i=0; i<this.game_board.grid.length; i++){
		var row = this.game_board.grid[i];
		for (var j=0; j<row.length; j++){
		    var cell_contents = row[j];
		    var coord = 'x' + String(i) + 'y' + String(j);
		    var cell = document.getElementById(coord);
		    var cell_class = get_class(cell_contents);
		    cell.setAttribute('class', cell_class);
		}
		
	    }
	};

	var key_press = function(){
	    
	};
	var restart = function(){
	    
	};

	this.run = function(){
	    // console.log("gaming block", game.game_block.current);
	    var go = setInterval(function() {
		$(document).keydown(function(evt) {
		    var key = game.check_keys(evt);
		    if (key == 'QUIT') {
			clearInterval(go);
		    }
		    else if (key == 'UP') {
			game.game_board.rotate(game.game_block);
			// console.log('rotate?', game.game_block.current);
			game.update_grid();
		    }
		});
		game.game_board.drop_block(game.game_block);
		// console.log('dropped block', game.game_block.current);
		game.update_grid();
	    }, 800);
	};
    }

    var block = new Block();
    block.new_block();
    // console.log('block', block.current);

    var board = new Grid(10,15);
    board.grid = board.create_grid();

    var game = new Game(board, block);
    game.draw_new_grid(40);
    game.game_board.insert_block(game.game_block);
    game.update_grid();
    game.run();

});


// game.update_grid();
// var cell1 = document.getElementById('x6y5');
// cell1.style.backgroundImage = "url(green.png)";

// var cell2 = document.getElementById('x5y6');
// cell2.style.backgroundImage = "url(green.png)";

// var cell3 = document.getElementById('x6y6');
// cell3.style.backgroundImage = "url(green.png)";

// var cell4 = document.getElementById('x7y6');
// cell4.style.backgroundImage = "url(green.png)";
