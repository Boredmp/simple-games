describe("Block", function() {
    var block = new Block();
    it("should create a 2D array of numbers", function() {
	block.new_block();
	expect(block.current).toBeArray();
	for (row in block.current) {
	    expect(block.current[row]).toBeArray();
	    for (cell in row) {
		expect(block.current[row][cell]).toBeNumber();
	    }
	}
    })
})

describe("Board", function() { 
    var board;
    var block;

    beforeEach(function(){
	var rows = 15;
	var cols = 10;
	board = new Board(rows, cols);
	board.create_grid();
	block = new Block();
	block.new_block();
    });

    it("should create a 2D array of numbers", function() {
	expect(board.grid).toBeArray();

	for (row in board.grid) {
	    expect(board.grid[row]).toBeArray();
	    for (cell in row) {
		expect(board.grid[row][cell]).toBeNumber();
	    }
	}
    });

    it("should insert a block into the game grid", function() {
	block.row = 0;
	block.col = 0;
	block.current = block.blocks[2][0];
	board.insert_block(block);
	expect(block.current).toBeArray();
	expect(board.grid[0][0]).toBe(0);
	expect(board.grid[0][1]).toBe(0);
	expect(board.grid[0][2]).toBeGreaterThan(0);
	expect(board.grid[1][0]).toBeGreaterThan(0);
	expect(board.grid[1][1]).toBeGreaterThan(0);
	expect(board.grid[1][2]).toBeGreaterThan(0);
    });

    it("should insert another block into the game grid", function() {
	block.row = 1;
	block.col = 4;
	block.current = block.blocks[4][0];
	board.insert_block(block);
	expect(board.grid[1][4]).toBe(0);
	expect(board.grid[1][5]).toBeGreaterThan(0);
	expect(board.grid[1][6]).toBe(0);
	expect(board.grid[2][4]).toBeGreaterThan(0);
	expect(board.grid[2][5]).toBeGreaterThan(0);
	expect(board.grid[2][6]).toBeGreaterThan(0);
    });

    it("should clear a block from the grid", function() { 
	board.insert_block(block);
	console.log(board.grid);
	board.clear_block(block.row, block.col, block);
	expect(board.grid[0][4]).toBe(0);
	expect(board.grid[0][5]).toBe(0);
	expect(board.grid[0][6]).toBe(0);
	expect(board.grid[1][4]).toBe(0);
	expect(board.grid[1][5]).toBe(0);
	expect(board.grid[1][6]).toBe(0);
    });

    it("should drop a block by one row", function() {
	board.insert_block(block);
	board.drop_block(block);
	console.log(board.grid);
	expect(board.grid[1][4]).toBe(1);
	expect(board.grid[1][5]).toBeGreaterThan(0);
	expect(board.grid[1][6]).toBeGreaterThan(0);
	expect(board.grid[2][4]).toBeGreaterThan(0);
	expect(board.grid[2][5]).toBeGreaterThan(0);
	expect(board.grid[2][6]).toBe(0);
    });
});