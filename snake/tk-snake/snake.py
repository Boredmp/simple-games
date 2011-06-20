#!/usr/bin/env python

from random import randint
from Tkinter import *
from snake_levels import get_level

class Snake(object):
    def __init__(self):
        # self.body = [(9,9),(9,10),(9,11),(9,12),(9,13),(9,14),(9,15)]
        # self.body = [(1,4),(2,4),(3,4),(3,3),(2,3),(1,3),(1,2)]
        self.body = [(16,1),(17,1),(18,1),(18,2),(17,2),(16,2),(15,2)] # level 2
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
        self.grid=get_level(4)
        self.score=0
        
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
            self.insert_food()

    def check_food(self, snake):
        next_position = snake.next_head
        food = self.grid[next_position[0]][next_position[1]]
        if (food == 1):
            self.insert_food()
            self.score=self.score+10
            return True
        else:
            return False

    def check_collision(self, snake):
        #check for collision with snake body
        next_position = snake.next_head
        wall = self.grid[next_position[0]][next_position[1]]
        if snake.next_head in snake.body:
            return True
        elif (wall ==3):
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
        self.frame=Frame(self.root)
        self.frame.pack()
        self.score_total=Label(self.frame, text="Score: 0   ")
        self.score_total.pack(fill=Y, side=LEFT)
        restartbutton=Button(self.frame, text="Restart", command=self.game_over)
        restartbutton.pack(fill=X, side=RIGHT)
##        exitbutton=Button(self.frame, text="Exit Game", command=sys.exit)
##        exitbutton.pack(fill=X, side=RIGHT)
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
        self.score_total["text"]="Score: "+str(self.board.score)+ "  "
        self.snake.next_position(self.board.grid)

        if self.board.check_collision(self.snake):
            #self.game_over()
            self.speed=0
            game_overtext=self.canvas.create_text(225, 275, text="Game Over!", fill="white",
                                    font=("Helvectica", "25"))
            game_overtext.pack()
            #Label(self.frame, text="Collision! Game Over").pack
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
