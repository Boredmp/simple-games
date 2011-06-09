from random import randint
from Tkinter import *

class Grid(object):
    def __init__(self, rows, cols):
        self.grid = self.create_grid(rows, cols)
        self.cleared_rows = 0
        self.score = 0

    def create_grid(self, rows, cols):
        new_grid = []
        for i in range(rows):
            row = []
            for j in range(cols):
                row.append(0)
            new_grid.append(row)
        return new_grid

    def check_rows(self):
        cleared = 0
        for i in range(len(self.grid)):
            row = self.grid[i]
            filled = 0
            for col in row:
                if (col > 0):
                    filled += 1
            if (filled >= len(self.grid[0])):
                del self.grid[i]
                new_row = []
                for j in range(len(self.grid[0])):
                    new_row.append(0)
                cleared += 1
                self.grid.insert(0, new_row)
        scores = [0, 40, 100, 300, 1200]
        self.cleared_rows = self.cleared_rows + cleared
        self.score = self.score + scores[cleared]

    def insert_block(self, block):
        for i in range(len(block.current)):
            for j in range(len(block.current[i])):
                this_x = block.x + i
                this_y = block.y + j
                if (block.current[i][j]>0):
                    self.grid[this_y][this_x] = block.current[i][j]
                else: 
                    pass

    def out_of_bounds_X(self, x_pos, block):
        if (x_pos<0):
            "left"
            return True
        elif (x_pos + len(block.current) > len(self.grid[0])):
            "right"
            return True
        else:
            return False
        
    def out_of_bounds_Y(self, block, y_pos):
        if (y_pos + len(block.current[0]) > len(self.grid)):
            return True
        else:
            return False

    def collision_check(self, check_x, check_y, block):
        """
        This method accepts block.current as a parameter, not a block object.
        """

        for i in range(len(block)):
            for j in range(len(block[i])):
                this_x = check_x + i
                this_y = check_y + j
                if ((self.grid[this_y][this_x] > 9) and (block[i][j]) > 0):
                    return True
        return False

    def check_rotation(self, block):
        check_block = block.blocks[block.shape][block.next_rotation()]
        collision_x = ((block.x + len(check_block)) > len(self.grid[0]))
        collision_y = ((block.y + len(check_block[0])) > len(self.grid))
        
        if (collision_x or collision_y):
            return True
        else:
            collides = self.collision_check(block.x, block.y, check_block)
            if (collides):
                return True
            else:
                return False

    def clear_block(self, old_x, old_y, current_block):
        """
        This method takes block.current as an argument, not a block object.
        """
        for i in range(len(current_block)):
            for j in range(len(current_block[i])):
                this_x = old_x + i
                this_y = old_y + j
                if (self.grid[this_y][this_x] < 10):
                    self.grid[this_y][this_x] = 0

    def cement_block(self, block):
        for i in range(len(block.current)):
            for j in range(len(block.current[i])):
                this_x = block.x + i
                this_y = block.y + j
                if (self.grid[this_y][this_x] < 10):
                    self.grid[this_y][this_x] = (block.current[i][j]) * 10
        self.check_rows()

    def drop_block(self, block):
        if (self.out_of_bounds_Y(block, block.y+1)):
            self.cement_block(block)
            block.new_block()
            self.insert_block(block)
            return True
        elif (self.collision_check(block.x, block.y+1, block.current)):
            self.cement_block(block)
            block.new_block()
            self.insert_block(block)
            return True
        else:
            old_x = block.x
            old_y = block.y
            block.y += 1
            self.clear_block(old_x, old_y, block.current)
            self.insert_block(block)
            return True

    def move_X(self, block, direction):
        movement = {'left':-1, 'right':+1}
        new_x = block.x + movement[direction]
        if (self.out_of_bounds_X(new_x, block)):
            return False
        elif (self.collision_check(new_x, block.y, block.current)):
            return False
        else:
            old_x = block.x
            old_y = block.y
            block.x = new_x
            self.clear_block(old_x, old_y,block.current)
            self.insert_block(block)
            return True

    def rotate(self, block):
        if (self.check_rotation(block)):
            return False
        else:
            self.clear_block(block.x, block.y,block.current)
            block.rotation = block.next_rotation()
            block.current = block.blocks[block.shape][block.rotation]
            self.insert_block(block)
            return True
                
class Block(object):
    def __init__(self):
        self.blocks = self.create_blocks()

    def create_blocks(self):
        shape1 = [[[ 0, 1, 1 ], [ 1, 1, 0 ]], [[ 1, 0], [ 1, 1], [ 0, 1]]]
        shape2 = [[[ 2, 2, 0 ],  [ 0, 2, 2 ]], [[ 0, 2], [ 2, 2], [ 2, 0]]]
        shape3 = [[[ 0, 0, 3 ],  [ 3, 3, 3 ]], [[ 3, 0], [ 3, 0], [ 3, 3]], [[ 3, 3, 3], [ 3, 0, 0]], [[3, 3], [0, 3], [0, 3]]]
        shape4 = [[[ 4, 0, 0 ],  [ 4, 4, 4 ]], [[ 4, 4], [ 4, 0], [ 4, 0]], [[ 4, 4, 4], [ 0, 0, 4]], [[ 0, 4], [ 0, 4], [ 4, 4]]]
        shape5 = [[[ 0, 5, 0 ],  [ 5, 5, 5 ]], [[ 5, 0], [ 5, 5],  [ 5, 0]], [[ 5, 5, 5], [ 0, 5, 0]], [[ 0, 5], [ 5, 5], [ 0, 5]]]
        shape6 = [[[ 6, 6, 6, 6 ]], [[ 6], [ 6], [ 6],  [ 6]]]
        shape7 = [[[ 7, 7 ],  [ 7, 7 ]]]
        blocks = [shape1, shape2, shape3, shape4, shape5, shape6, shape7]
        return blocks

    def new_block(self):
        block_num = randint(0,(len(self.blocks)-1))
        self.shape = block_num
        self.rotation = 0
        self.current = self.blocks[self.shape][self.rotation]
        self.x = 4
        self.y = 0

    def next_rotation(self):
        if ((self.rotation + 1) > len(self.blocks[self.shape]) - 1):
            return 0
        else:
            return self.rotation + 1

        
class Game(object):
    def __init__(self, grid, block):
        self.grid = grid
        self.block = block
        self.root = Tk()
        self.root.bind("<Key>", self.keyPressed)
        self.frame = Frame(self.root)
        self.frame.pack()
        self.score_rows = Label(self.frame, justify=LEFT, text="Rows: 0")
        self.score_rows.pack(fill=X, side=LEFT)
        self.score_total = Label(self.frame, justify=RIGHT, text="Score: 0")
        self.score_total.pack(fill=X, side=RIGHT)
        self.score = 0
        self.cleared_rows = 0
        self.canvas = Canvas(self.root, width=310, height=465)
        self.canvas.pack()
        self.block.new_block()
        self.grid.insert_block(self.block)
        self.run()
        self.root.mainloop()
    
    def run(self):
        self.score_total["text"] = "Score: " + str(self.grid.score)
        self.score_rows["text"] = "Rows: " + str(self.grid.cleared_rows)
        self.grid.drop_block(self.block)
        self.draw_grid()
        self.root.after(800, self.run)


    def draw_cell(self, left, top, right, bottom, value):
        colors = ("#260033", "#f24e4e", "#ff7f47", "#ffb91c", "#75de41", "#03e3c2", "#7e00f2", "#00de3b")
        if (value > 9):
            value = value/10
        fill_color = colors[value]
        self.canvas.create_rectangle(left, top, right, bottom, fill=fill_color)

    def draw_grid(self):
        for i in range(len(self.grid.grid)):
            for j in range(len(self.grid.grid[i])):
                value = self.grid.grid[i][j]
                left = j * 31
                top = i * 31
                right = j * 31 + 31
                bottom = i * 31 + 31            
                self.draw_cell(left, top, right, bottom, value)

    def keyPressed(self, event):
        if (event.keysym =="Up"):
            if(self.grid.rotate(self.block)):
                self.draw_grid()
            else:
                pass
        elif (event.keysym =="Down"):
            if(self.grid.drop_block(self.block)):
                self.draw_grid()
            else:
                pass
        elif (event.keysym=="Left"):
            if (self.grid.move_X(self.block, 'left')):
                self.draw_grid()
            else:
                pass
        elif (event.keysym =="Right"):
            if (self.grid.move_X(self.block, 'right')):
                self.draw_grid()
            else:
                pass
        elif (event.keysym =="r"):
            restart()
    
def run():
    grid = Grid(15, 10)
    block = Block()
    game = Game(grid, block)
