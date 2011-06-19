#!/usr/bin/env python

from random import randint
from Tkinter import *
from snake_levels import get_level

class Snake(object):
    def __init__(self):
        self.body = [(4,4),(4,5),(4,6),(5,6),(6,6),(7,6),(8,6)]
        self.direction = 'N'
        self.next_head = (0,0)
        
    def next_position(self, grid):
        directions = {'N': (-1,0), 'S':(1,0), 'E':(0,1), 'W':(0,-1)}
        movement = directions[self.direction]
        next_row=self.body[0][0] + movement[0]
        next_col=self.body[0][1] + movement[1]
        if next_row<0:
            next_row=len(grid)-1
        if next_row>len(grid)-1:
            next_row=0
        if next_col<0:
            next_col=len(grid[0])-1
        if next_col>len(grid[0])-1:
            next_col=0
        head=(next_row, next_col)
        self.next_head = head
        
    def move(self, growing):
        if growing:
            head = self.next_head
            self.body.insert(0, head)
        else:
            self.body.pop()
            head = self.next_head
            self.body.insert(0, head)

class Grid(object):
    def __init__(self):
        self.grid=get_level(0)
        
    def insert_snake(self, snake_body):
        for coord in snake_body:
            x = coord[0]
            y = coord[1]
            self.grid[x][y] = 2
       
    def insert_food(self):
        food_x=randint(0, len(self.grid)-1)
        food_y=randint(0, len(self.grid[0])-1)
        if self.grid[food_x][food_y] == 0:  
            self.grid[food_x][food_y]=1
        else: 
            insert_food()



    def check_food(self, snake):
        next_position = snake.next_head
        food = self.grid[next_position[0]][next_position[1]]
        if (food == 1):
            self.insert_food()
            return True
        else:
            return False

    def check_collision(self, snake):
        #check for collision with snake body
        next_position = snake.next_head
        wall = self.grid[next_position[0]][next_position[1]]
        if snake.next_head in snake.body:
            print "Game Over"
            return True
        elif (wall ==3):
            print "Game Over"
            return True
        else:
            return False

    def clear_snake(self, snake_body):
        last = snake_body[len(snake_body)-1]
        self.grid[last[0]][last[1]] = 0
            
class Game(object):
    def __init__(self):
        self.root=Tk()
        self.board=Grid()
        self.snake = Snake()
        self.speed = 200
        self.cell_width=25
        self.root.bind("<Key>", self.keyPressed)
        self.canvas = Canvas(self.root, width=self.cell_width*len(self.board.grid[0]), height=self.cell_width*len(self.board.grid))
        self.canvas.pack()
        self.board.insert_food()
        self.draw_grid()
        self.run()
        self.root.mainloop()

    def game_over(self):
        self.root.destroy()
        self.__init__()

    def draw_cell(self, left, top, right, bottom, value):
        colors = ("#260033", "#f24e4e", "#ff7f47", "#ffb91c", "#75de41", "#03e3c2", "#7e00f2", "#00de3b")
        if (value > 9):
            value = value/10
        fill_color = colors[value]
        self.canvas.create_rectangle(left, top, right, bottom, fill=fill_color)

    def draw_grid(self):
        for i in range(len(self.board.grid)):
            for j in range(len(self.board.grid[i])):
                value = self.board.grid[i][j]
                left = j * self.cell_width
                top = i * self.cell_width
                right = j * self.cell_width + self.cell_width
                bottom = i * self.cell_width + self.cell_width            
                self.draw_cell(left, top, right, bottom, value) 
                
    def keyPressed(self, event):
        if (event.keysym =="Up"):
            self.snake.direction = 'N'
        elif (event.keysym =="Down"):
            self.snake.direction = 'S'
        elif (event.keysym=="Left"):
            self.snake.direction = 'W'
        elif (event.keysym =="Right"):
            self.snake.direction = 'E'
        elif (event.keysym =="r"):
            restart()

    def run(self):
        self.snake.next_position(self.board.grid)

        if self.board.check_collision(self.snake):
            self.game_over()
        self.board.clear_snake(self.snake.body)

        if self.board.check_food(self.snake):
            self.snake.move(True)
            if self.speed > 15:
                self.speed -= 5

        else:
            self.snake.move(False)

        self.board.insert_snake(self.snake.body)
        self.draw_grid()
        self.root.after(self.speed, self.run)


if __name__ ==  "__main__":
    game = Game()
