#!/usr/bin/env python

from random import randint
from Tkinter import *

class Tetris(object):
    def loadBoard(self, rows, cols):
        new_board = []
        for i in range(rows):
            row = []
            for j in range(cols):
                row.append(0)
            new_board.append(row)
        print new_board
        return new_board

    def __init__(self,root):
        rows=15
        cols=10
        self.board = self.loadBoard(rows, cols)
        self.canvas = Canvas(root, width=310, height=465)
        self.canvas.pack()
        self.pieces = [
            [[ 0, 1, 1 ], [ 1, 1, 0 ]],
            [[ 2, 2, 0 ], [ 0, 2, 2 ]],
            [[ 0, 0, 3 ], [ 3, 3, 3 ]],
            [[ 4, 0, 0 ], [ 4, 4, 4 ]],
            [[ 0, 5, 0 ], [ 5, 5, 5 ]],
            [[ 6, 6, 6, 6 ]],
            [[ 7, 7 ], [ 7, 7 ]]   
            ]
        self.x_pos = 4
        self.y_pos = 0
        self.current_piece = 0

def drawCell(left, top, right, bottom, value):
    if (value == 0):
        fill_color = "blue"
    else:
        fill_color = "yellow"
    tetris.canvas.create_rectangle(left, top, right, bottom, fill=fill_color)

def drawBoard():
    for i in range(len(tetris.board)):
        for j in range(len(tetris.board[i])):
            value = tetris.board[i][j]
            left = i * 31
            top = j * 31
            right = i * 31 + 31
            bottom = j * 31 + 31            
            drawCell(left, top, right, bottom, value)
    print tetris.board

def drawPiece():
    piece = tetris.pieces[tetris.current_piece]
    for i in range(len(piece)):
        for j in range(len(piece[i])):
            this_x = tetris.x_pos + i
            this_y = tetris.y_pos + j
            tetris.board[this_x][this_y] = piece[i][j]
    drawBoard()

def movePiece(old_x, old_y):
    piece = tetris.pieces[tetris.current_piece]
    for i in range(len(piece)):
        for j in range(len(piece[i])):
            this_x = old_x + i
            this_y = old_y + j
            tetris.board[this_x][this_y] = 0
    drawPiece()

def newPiece():
    piece_num = randint(0,(len(tetris.pieces)-1))
    tetris.current_piece = piece_num
    tetris.x_pos = 4
    tetris.y_pos = 0
    drawPiece()

def keyPressed(event):
    if (event.keysym =="Up"):
        pass
        # rotateFallingPiece()
    elif (event.keysym =="Down"):
        # moveFallingPiece(+1, 0)
        pass
    elif (event.keysym=="Left"):
        old_x = tetris.x_pos
        old_y = tetris.y_pos
        tetris.x_pos -= 1
        movePiece(old_x, old_y)
    elif (event.keysym =="Right"):
        old_x = tetris.x_pos
        old_y = tetris.y_pos
        tetris.x_pos += 1
        movePiece(old_x, old_y)
    elif (event.keysym =="r"):
        pass
        # restartGame()

def run():
    root = Tk()
    global tetris
    tetris = Tetris(root)
    newPiece()
    root.bind("<Key>", keyPressed)
    root.mainloop()

run()

