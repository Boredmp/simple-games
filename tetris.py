#!/usr/bin/env python

from random import randint
from Tkinter import *

class Tetris(object):
    def loadBoard(self):
        new_board = []
        for i in range(self.rows):
            row = []
            for j in range(self.cols):
                row.append(0)
            new_board.append(row)
        return new_board

    def checkRows(self):
        cleared = 0
        for i in range(len(self.board)):
            row = self.board[i]
            filled = 0
            for col in row:
                if (col > 0):
                    filled += 1
            if (filled >= self.cols):
                del self.board[i]
                new_row = []
                for j in range(self.cols):
                    new_row.append(0)
                cleared += 1
                self.board.insert(0, new_row)
        scores = [0, 40, 100, 300, 1200]
        self.cleared_rows = self.cleared_rows + cleared
        self.score = self.score + scores[cleared]
        print scores[cleared]
        print self.score
        self.score_total["text"] = "Score: " + str(self.score)
        self.score_rows["text"] = "Rows: " + str(self.cleared_rows)
                    
    def __init__(self):
        self.rows=15
        self.cols=10
        self.root = Tk()
        self.board = self.loadBoard()

        self.frame = Frame(self.root)
        self.frame.pack()
        self.score_rows = Label(self.frame, justify=LEFT, text="Rows: 0")
        self.score_rows.pack(fill=X, side=LEFT)
        self.score_total = Label(self.frame, justify=RIGHT, text="Score: 0")
        self.score_total.pack(fill=X, side=RIGHT)
        self.canvas = Canvas(self.root, width=310, height=465)
        self.canvas.pack()
        self.cleared_rows = 0
        self.score = 0
        shape1 = [[[ 0, 1, 1 ], [ 1, 1, 0 ]], [[ 1, 0], [ 1, 1], [ 0, 1]]]
        shape2 = [[[ 2, 2, 0 ],  [ 0, 2, 2 ]], [[ 0, 2], [ 2, 2], [ 2, 0]]]
        shape3 = [[[ 0, 0, 3 ],  [ 3, 3, 3 ]], [[ 3, 0], [ 3, 0], [ 3, 3]], [[ 3, 3, 3], [ 3, 0, 0]], [[3, 3], [0, 3], [0, 3]]]
        shape4 = [[[ 4, 0, 0 ],  [ 4, 4, 4 ]], [[ 4, 4], [ 4, 0], [ 4, 0]], [[ 4, 4, 4], [ 0, 0, 4]], [[ 0, 4], [ 0, 4], [ 4, 4]]]
        shape5 = [[[ 0, 5, 0 ],  [ 5, 5, 5 ]], [[ 5, 0], [ 5, 5],  [ 5, 0]], [[ 5, 5, 5], [ 0, 5, 0]], [[ 0, 5], [ 5, 5], [ 0, 5]]]
        shape6 = [[[ 6, 6, 6, 6 ]], [[ 6], [ 6], [ 6],  [ 6]]]
        shape7 = [[[ 7, 7 ],  [ 7, 7 ]]]
        self.pieces = []
        self.pieces.append(shape1), self.pieces.append(shape2), self.pieces.append(shape3), self.pieces.append(shape4), self.pieces.append(shape5), self.pieces.append(shape6), self.pieces.append(shape7)
        self.x_pos = 4
        self.y_pos = 0
        self.shape = 0
        self.rotation = 0
        self.current_piece = self.pieces[self.shape][self.rotation]
        self.root.bind("<Key>", keyPressed)

def drawCell(left, top, right, bottom, value):
    colors = ("#260033", "#f24e4e", "#ff7f47", "#ffb91c", "#75de41", "#03e3c2", "#7e00f2", "#00de3b")
    if (value > 9):
        value = value/10
    fill_color = colors[value]
    tetris.canvas.create_rectangle(left, top, right, bottom, fill=fill_color)

def drawBoard():
    for i in range(len(tetris.board)):
        for j in range(len(tetris.board[i])):
            value = tetris.board[i][j]
            left = j * 31
            top = i * 31
            right = j * 31 + 31
            bottom = i * 31 + 31            
            drawCell(left, top, right, bottom, value)

def drawPiece():
    for i in range(len(tetris.current_piece)):
        for j in range(len(tetris.current_piece[i])):
            this_x = tetris.x_pos + i
            this_y = tetris.y_pos + j
            if (tetris.current_piece[i][j]>0):
                tetris.board[this_y][this_x] = tetris.current_piece[i][j]
            else: 
                pass
    drawBoard()

def movePiece(old_x, old_y):
    for i in range(len(tetris.current_piece)):
        for j in range(len(tetris.current_piece[i])):
            this_x = old_x + i
            this_y = old_y + j
            if (tetris.board[this_y][this_x] < 10):
                tetris.board[this_y][this_x] = 0
    drawPiece()

def clearPiece():
    for i in range(len(tetris.current_piece)):
        for j in range(len(tetris.current_piece[i])):
            this_x = tetris.x_pos + i
            this_y = tetris.y_pos + j
            if (tetris.board[this_y][this_x] < 10):
                tetris.board[this_y][this_x] = 0
    return

def newPiece():
    piece_num = randint(0,(len(tetris.pieces)-1))
    tetris.shape = piece_num
    tetris.rotation = 0
    tetris.current_piece = tetris.pieces[tetris.shape][tetris.rotation]
    tetris.x_pos = 4
    tetris.y_pos = 0
    drawPiece()

def collision_check(check_x, check_y, piece):
    for i in range(len(piece)):
        for j in range(len(piece[i])):
            this_x = check_x + i
            this_y = check_y + j
            if ((tetris.board[this_y][this_x] > 9) and (piece[i][j]) > 0):
                return True
    else:
        return False

def cement_block():
    for i in range(len(tetris.current_piece)):
        for j in range(len(tetris.current_piece[i])):
            this_x = tetris.x_pos + i
            this_y = tetris.y_pos + j
            if (tetris.board[this_y][this_x] < 10):
                tetris.board[this_y][this_x] = (tetris.current_piece[i][j]) * 10
    tetris.checkRows()
    if (tetris.y_pos == 0):
        restart()

def outOfBoundsX(x):
    if (x<0):
        return True
    elif (x + len(tetris.current_piece) > len(tetris.board[0])):
        return True
    else:
        return False

def outOfBoundsY(y):
    if (y + len(tetris.current_piece[0]) > len(tetris.board)):
        return True
    else:
        return False

def checkRotation():
    this_rotation = tetris.rotation
    okay = ((this_rotation+1) > len(tetris.pieces[tetris.shape])-1)

    if (okay):
        this_rotation = 0
    else:
        this_rotation += 1

    new_piece = tetris.pieces[tetris.shape][(this_rotation)]
    not_okay = ((tetris.x_pos + len(new_piece)) > len(tetris.board[0]))
    also_bad = ((tetris.y_pos + len(new_piece[0])) > len(tetris.board))

    if (not_okay or also_bad):
        return True
    else:
        collides = collision_check(tetris.x_pos, tetris.y_pos, new_piece)
        if (collides):
            return True
        else:
            return False
    
def dropPiece():
    if (outOfBoundsY(tetris.y_pos+1)):
        cement_block()
        newPiece()
    elif (collision_check(tetris.x_pos, tetris.y_pos+1, tetris.current_piece)):
        cement_block()
        newPiece()
    else:
        old_x = tetris.x_pos
        old_y = tetris.y_pos
        tetris.y_pos += 1
        movePiece(old_x, old_y)

def rotate():
    this_rotation = tetris.rotation
    okay = ((this_rotation+1) > len(tetris.pieces[tetris.shape])-1)

    if (okay):
        tetris.rotation = 0
    else:
        tetris.rotation += 1

    new_piece = tetris.pieces[tetris.shape][(this_rotation)]
    not_okay = ((tetris.x_pos + len(new_piece)) > len(tetris.board[0]))
    clearPiece()
    tetris.current_piece = tetris.pieces[tetris.shape][tetris.rotation]
    drawPiece()

def keyPressed(event):
    if (event.keysym =="Up"):
        if (checkRotation()):
            pass
        else:
            rotate()
    elif (event.keysym =="Down"):
        dropPiece()
    elif (event.keysym=="Left"):
        if (outOfBoundsX(tetris.x_pos-1)):
            pass
        elif (collision_check(tetris.x_pos-1, tetris.y_pos, tetris.current_piece)):
            pass
        else:
            old_x = tetris.x_pos
            old_y = tetris.y_pos
            tetris.x_pos -= 1
            movePiece(old_x, old_y)
    elif (event.keysym =="Right"):
        if (outOfBoundsX(tetris.x_pos+1)):
            pass
        elif (collision_check(tetris.x_pos+1, tetris.y_pos, tetris.current_piece)):
            pass
        else:
            old_x = tetris.x_pos
            old_y = tetris.y_pos
            tetris.x_pos += 1
            movePiece(old_x, old_y)
    elif (event.keysym =="r"):
        restart()

def restart():
    tetris.root.destroy()
    init()

def run():
    dropPiece()
    tetris.root.after(800, run)

def init():
    global tetris
    tetris = Tetris()
    newPiece()
    run()
    tetris.root.mainloop()

init()

