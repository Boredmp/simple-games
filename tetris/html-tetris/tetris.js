$(document).ready(function() {
    function Block() {
	this.create_blocks = function(){
	    var shape1 = [[[ 0, 1, 1 ], [ 1, 1, 0 ]], [[ 1, 0], [ 1, 1], [ 0, 1]]]
            var shape2 = [[[ 2, 2, 0 ],  [ 0, 2, 2 ]], [[ 0, 2], [ 2, 2], [ 2, 0]]]
            var shape3 = [[[ 0, 0, 3 ],  [ 3, 3, 3 ]], [[ 3, 0], [ 3, 0], [ 3, 3]], [[ 3, 3, 3], [ 3, 0, 0]], [[3, 3], [0, 3], [0, 3]]]
            var shape4 = [[[ 4, 0, 0 ],  [ 4, 4, 4 ]], [[ 4, 4], [ 4, 0], [ 4, 0]], [[ 4, 4, 4], [ 0, 0, 4]], [[ 0, 4], [ 0, 4], [ 4, 4]]]
            var shape5 = [[[ 0, 5, 0 ],  [ 5, 5, 5 ]], [[ 5, 0], [ 5, 5],  [ 5, 0]], [[ 5, 5, 5], [ 0, 5, 0]], [[ 0, 5], [ 5, 5], [ 0, 5]]]
            var shape6 = [[[ 6, 6, 6, 6 ]], [[ 6], [ 6], [ 6],  [ 6]]]
            var shape7 = [[[ 7, 7 ],  [ 7, 7 ]]]
            var blocks = [shape1, shape2, shape3, shape4, shape5, shape6, shape7]
            return blocks
	}

	this.blocks = this.create_blocks();
	this.current = this.blocks[0][0];
	this.x_pos = 4;
	this.y_pos = 6;

	this.new_block = function(){
	    this.current = this.blocks[0][0];
	    this.x_pos = 4;
	    this.y_pos = 0;
	}

	var next_rotation = function(){
	}
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
	}

	var check_rows = function(){
	    
	}

	this.insert_block = function(block){
	    for (var i=0; i<block.current.length; i++ ){
		for (var j=0; j<block.current[i].length; j++){
		    var x = block.x_pos + i;
		    var y = block.y_pos + j;
		    if (block.current[i][j]>0) {
			this.grid[x][y] = block.current[i][j];
		    }
		}
	    }
	}

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
	}


	var out_of_bounds_X = function(){
	    
	}

	this.out_of_bounds_Y = function(block, y_pos){
	    console.log(y_pos, block.current[0].length)
	    if (y_pos + block.current[0].length > this.grid[0].length) {
		console.log('OUTT');
		return true;
	    }
	    else {return false};
	}

	var collision_check = function(){
	    
	}
	var check_rotation = function(){
	    
	}


	this.cement_block = function(){
	    
	}

	this.drop_block = function(block){
	    if (this.out_of_bounds_Y(block, block.y_pos+1)){
		console.log('Too low dal;fkdjal;fkd');
		this.cement_block(block);
		block.new_block();
		this.insert_block(block);
	    }
	    else {
		var old_x = block.x_pos;
		var old_y = block.y_pos;
		block.y_pos ++;
		this.clear_block(old_x, old_y, block.current);
		this.insert_block(block);
	    }
    	}

	var move_X = function(){
	    
	}
	var rotate = function(){

	}
    }

    function Game(board, block) {
	this.game_board = board;
	this.game_block = block;

	this.draw_new_grid = function(cell_width){
	    var game_div = document.createElement('div');
	    game_div.setAttribute('id', 'game');
	    game_div.style.width = cell_width * this.game_board.rows;
	    game_div.style.height = cell_width * this.game_board.cols;
	    document.getElementById('main').appendChild(game_div);
	    for (i=0; i<this.game_board.rows; i++) {
	    	for (j=0; j<this.game_board.cols; j++) {
	    	    var cell = document.createElement('div');
	    	    cell.setAttribute('class', 'empty');
	    	    var current_id = "x" + i + "y" + j;
	    	    cell.setAttribute('id', current_id);
	    	    cell.style.top = (j * cell_width)+1;
	    	    cell.style.left = (i * cell_width)+1;
	    	    game_div.appendChild(cell);
	    	}
	    }
	}

	this.update_grid = function(){
    	    var get_class = function(class_code){
    		var classes = ['empty', 'green']
    		if (class_code > 9) {
    		    class_code = class_code / 10;
    		}
    		return classes[class_code];
    	    }

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
	}

	var key_press = function(){
	    
	}
	var restart = function(){
	    
	}

	this.run = function(){
	    var go = setInterval(function() {
		game.update_grid();
		game.game_board.drop_block(game.game_block);
	    }, 800);
	}
    }

    var block = new Block();
    block.new_block()

    var board = new Grid(10,15);
    board.grid = board.create_grid();

    var game = new Game(board, block);
    game.draw_new_grid(40);
    game.game_board.insert_block(game.game_block);
    game.run()

})


// game.update_grid();
// var cell1 = document.getElementById('x6y5');
// cell1.style.backgroundImage = "url(green.png)";

// var cell2 = document.getElementById('x5y6');
// cell2.style.backgroundImage = "url(green.png)";

// var cell3 = document.getElementById('x6y6');
// cell3.style.backgroundImage = "url(green.png)";

// var cell4 = document.getElementById('x7y6');
// cell4.style.backgroundImage = "url(green.png)";
