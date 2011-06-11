function Block() {
    var create_blocks = function(){

    }
    var new_block = function(){

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
    var insert_block = function(){
	
    }
    var out_of_bounds_X = function(){
	
    }
    var out_of_bounds_Y = function(){
	
    }
    var collision_check = function(){
	
    }
    var check_rotation = function(){
	
    };
    var clear_block = function(){
	
    }
    var cement_block = function(){
	
    }
    var drop_block = function(){
	
    }
    var move_X = function(){
	
    }
    var rotate = function(){

    }
}

function Game(grid, cell_width) {
    this.grid = grid;
    this.cell_width = cell_width;

    var run = function(){
    }

    this.draw_new_grid = function(){
	var game = document.createElement('div');
	game.setAttribute('id', 'game');
	game.style.width = cell_width * grid.rows;
	game.style.height = cell_width * grid.cols;
	document.getElementById('main').appendChild(game);
	for (i=0; i<grid.rows; i++) {
	    for (j=0; j<grid.cols; j++) {
		var cell = document.createElement('div');
		cell.setAttribute('class', 'empty');
		var current_id = "x" + i + "y" + j;
		cell.setAttribute('id', current_id);
		cell.style.top = (j * cell_width)+1;
		cell.style.left = (i * cell_width)+1;
		game.appendChild(cell);
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

	for (var i=0; i<grid.grid.length; i++){
	    var row = grid.grid[i];
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
    
}

var grid = new Grid(10,15);
grid.grid = grid.create_grid();

var game = new Game(grid, 40);
game.draw_new_grid();
game.grid.grid[3][1] = 1;
game.update_grid();

// game.update_grid();
// var cell1 = document.getElementById('x6y5');
// cell1.style.backgroundImage = "url(green.png)";

// var cell2 = document.getElementById('x5y6');
// cell2.style.backgroundImage = "url(green.png)";

// var cell3 = document.getElementById('x6y6');
// cell3.style.backgroundImage = "url(green.png)";

// var cell4 = document.getElementById('x7y6');
// cell4.style.backgroundImage = "url(green.png)";
