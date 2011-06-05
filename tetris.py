#!/usr/bin/env python

from Tkinter import *

def create_pieces():
    tetros = []
    sPiece = [
        [ 0, 1, 1 ],
        [ 1, 1, 0 ]
        ]
    zPiece = [
        [ 2, 2, 0 ],
        [ 0, 2, 2 ]
        ]
    lPiece = [
        [ 0, 0, 3 ],
        [ 3, 3, 3 ]
        ]
    jPiece = [
        [ 4, 0, 0 ],
        [ 4, 4, 4 ]
        ]
    tPiece = [
        [ 0, 5, 0 ],
        [ 5, 5, 5 ]
        ]
    iPiece = [
        [ 6, 6, 6, 6 ]
        ]
    oPiece = [
        [ 7, 7 ],
        [ 7, 7 ]
        ]
    tetros.append(sPiece)
    tetros.append(zPiece)
    tetros.append(lPiece)
    tetros.append(jPiece)
    tetros.append(tPiece)
    tetros.append(iPiece)
    tetros.append(oPiece)
    
    return tetros

def loadBoard(rows, cols):
    new_board = []
    for i in range(rows):
        row = []
        for j in range(cols):
            row.append(0)
        new_board.append(row)
    return new_board

def drawCell(left, top, right, bottom, value):
    if (value == 0):
        fill_color = "blue"
    else:
        fill_color = "yellow"
        
    canvas.create_rectangle(left, top, right, bottom, fill=fill_color)

def drawBoard(board):
    for i in range(len(board)):
        for j in range(len(board[i])):
            value = board[i][j]
            left = i * 31
            top = j * 31
            right = i * 31 + 31
            bottom = j * 31 + 31            
            drawCell(left, top, right, bottom, value)

def drawPiece(board, piece, x, y):
    for i in range(len(piece)):
        for j in range(len(piece)):
            this_x = x + i
            this_y = y + j
            board[this_x][this_y] = piece[i][j]

    drawBoard(board)

def movePiece(board, piece, old_x, old_y, x, y):
    for i in range(len(piece)):
        for j in range(len(piece)):
            this_x = old_x + i
            this_y = old_y + j
            board[this_x][this_y] = 0
    drawPiece(board, piece, x, y)

def keyPressed(event):
    if (event.keysym =="Up"):
        pass
        # rotateFallingPiece()
    elif (event.keysym =="Down"):
        # moveFallingPiece(+1, 0)
        pass
    elif (event.keysym=="Left"):
        old_x = x
        old_y = y
        x += 1
        y += 1
        movePiece(board, piece, old_x, old_y, x, y)
    elif (event.keysym =="Right"):
        old_x = x
        old_y = y
        x -= 1
        y -= 1
        movePiece(board, piece, old_x, old_y, x, y)
    elif (event.keysym =="r"):
        pass
        # restartGame()
                  
def run():
    root = Tk()
    global canvas
    canvas = Canvas(root, width=310, height=465)
    canvas.pack()
    board = loadBoard(10,15)
    tetros = create_pieces()
    piece = tetros[6]
    x = 4
    y = 0
    root.bind("<Key>", keyPressed)
    root.mainloop()

run()
#drawPiece(board,0,4)
