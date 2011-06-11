function make_grid(rows, cols, cell_width) {
    var game = document.createElement('div');
    game.setAttribute('id', 'game');
    game.style.width = cell_width * rows;
    game.style.height = cell_width * cols;
    document.getElementById('main').appendChild(game);
    for (i=0; i<rows; i++) {
	for (j=0; j<cols; j++) {
	    var cell = document.createElement('div');
	    cell.setAttribute('class', 'cell');
	    var current_id = "x" + i + "y" + j;
	    cell.setAttribute('id', current_id);
	    cell.style.top = (j * cell_width)+1;
	    cell.style.left = (i * cell_width)+1;
	    game.appendChild(cell);
	}
    }
}

make_grid(10, 15, 40);

var cell1 = document.getElementById('x6y5');
cell1.style.backgroundImage = "url(green.png)";

var cell2 = document.getElementById('x5y6');
cell2.style.backgroundImage = "url(green.png)";

var cell3 = document.getElementById('x6y6');
cell3.style.backgroundImage = "url(green.png)";

var cell4 = document.getElementById('x7y6');
cell4.style.backgroundImage = "url(green.png)";


