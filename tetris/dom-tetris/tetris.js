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
    this.row = 0;
    this.col = 4;

    this.new_block = function(){
	this.shape = 0;
	this.rotation = 0;
	this.current = this.blocks[this.shape][this.rotation];
	this.row = 0;
	this.col = 4;
    };
};

function Board(rows, cols) {
    this.grid = [];
    this.rows = rows;
    this.cols = cols;

    this.create_grid = function(){
	var new_grid = [];
	for (var i=0; i<this.rows; i++) {
	    var row = [];
	    for (var j=0; j<this.cols; j++) {
	    	row.push(0);
	    }
	    new_grid.push(row);
	}
	this.grid = new_grid;
    }
    
    this.insert_block = function(insert_block) {
	for (var i=0; i<insert_block.current.length; i++ ){
	    for (var j=0; j<insert_block.current[i].length; j++){
		var row = insert_block.row + i;
		var col = insert_block.col + j;
		if (insert_block.current[i][j]>0) {
		    this.grid[row][col] = insert_block.current[i][j];
		}
	    }
	}
    };

    this.clear_block = function(old_row, old_col, block){
	for (var i=0; i<block.length; i++ ){
	    for (var j=0; j<block[i].length; j++){
		var x = old_row + i;
		var y = old_col + j;
		if (block.current[i][j] < 10) {
		    this.grid[x][y] = 0;
		}
	    }
	}
    };


    this.drop_block = function(block) {
	return false;
	// var old_x = drop_block.x_pos;
	// var old_y = drop_block.y_pos;
	// drop_block.y_pos ++;
	// this.clear_block(old_x, old_y, drop_block.current);
	// this.insert_block(drop_block);
    };
	// this.drop_block = function(drop_block){
	//     // console.log('global?', block.current);
	//     // console.log('dropping', drop_block.current);
	//     if (this.out_of_bounds_Y(drop_block, drop_block.y_pos+1)){
	// 	this.cement_block(drop_block);
	// 	drop_block.new_block();
	// 	this.insert_block(drop_block);
	//     }
	//     else {
	// 	var old_x = drop_block.x_pos;
	// 	var old_y = drop_block.y_pos;
	// 	drop_block.y_pos ++;
	// 	this.clear_block(old_x, old_y, drop_block.current);
	// 	this.insert_block(drop_block);
	//     }
    	// };

}