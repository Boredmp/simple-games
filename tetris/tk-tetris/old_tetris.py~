# MyTertris.py

from Tkinter import * 
# from Tkinter import tkfont, canvas, 
# from Tkinter import tkfont
import random
import sys
import tkMessageBox

emptyColor = "blue"

def restartGame():
    canvas.data.isGameOver=False
    run (15,10)
    
def mousePressed (event):
    moveFallingPiece()
    redrawAll()

def fallingPieceCenter(row, col, topRow, topCol):
    pass

def doTimerFired():
    pass

def notsure():
    pass
    #boardRows=len(board)
    #boardCols=len(board[0]

    #rows=canvas.data.fallingPieceRows
    #cols=canvas.data.fallingPieceCols

    #tempTopRow=canvas.data.fallingPieceTopRow +drow
    #tempTopCol=canvas.data.fallingPieceTopcol+dcol

    #legal=True
    #for row in range (rows):
     #      for col in range (cols):

def moveFallingPiece():
    if (fallingPieceIsLegal (drow, dcol)==True):
        canvas.data.fallingPieceTopRow +=drow
        canvas.data.fallingPieceTopCol += dcol
        #print "**Here :", canvas.data.fallingPieceTopRow, " ", ca
        return True
    else:
        returnFalse

def isFull (row):
    cols=len(canvas.data.board[0])

    full=True

def timerFired():
    doTimerFired()
    if (moveFallingPiece (0,0)==False):
        canvas.data.isGameover=True
        drawText(150,100, "Game Over!\nPress 'r' to restart.")
        canvas.after_cancel(canvas.data.id)
    elif(canvas.data.isGameOver !=True):
        redrawAll()
        delay= 500 #milliseconds
        canvas.data.id=canvas.after(delay, timerFired) #pause

def drawBackground():
    #canvas.create_rectangle(-1,-1, canvas.data.width, canvas.data.height)
    pass

        
def drawCell(row, col, color):
    margin = 5
    cellSize = 30
    left = margin + col * cellSize
    right = left + cellSize
    top = margin + row * cellSize
    bottom = top + cellSize
    canvas.create_rectangle(left, top, right, bottom, fill=emptyColor)
    canvas.create_rectangle(left+3, top+3, right-3, bottom-3, fill=color)


def drawFallingPiece():
    rows = canvas.data.fallingPieceRows
    cols = canvas.data.fallingPieceCols

    boardRows = len(canvas.data.board)
    boardCols = len(canvas.data.board[0])

    top = canvas.data.fallingPieceTopRow
    topCol=canvas.data.fallingPieceTopCol
    #print canvas.data.fallingPiece
    for row in range (rows):
        i=0
        for col in range(cols):
            if (canvas.data.fallingPiece[row][col]==True):
                drawCell (top, topCol+i, canvas.data.fallingPieceColor)
            i+=1
        top+=1

def newFallingPiece():
    i=random.randint(0,6)
    canvas.data.fallingPiece=canvas.data.tetrisPieces[i]
    canvas.data.fallingPieceColor=canvas.data.tetrisPieceColors[i]
    canvas.data.fallingPieceRows=len(canvas.data.fallingPiece)
    canvas.data.fallingPieceCols=len(canvas.data.fallingPiece[0])

    #boardRows=len(canvas.data.rows)
    boardCols=len(canvas.data.board[0])

    #rows=canvas.data.fallingPieceRows
    cols=canvas.data.fallingPieceCols
    canvas.data.fallingPieceTopRow=0
    canvas.data.fallingPieceTopCol=boardCols/2-cols/2

def keyPressed(event):
    if (event.keysym =="Up"):
        rotateFallingPiece()
    elif (event.keysym =="Down"):
        moveFallingPiece(+1, 0)
    elif (event.keysym=="Left"):
        moveFallingPiece(0, -1)
    elif (event.keysym =="Right"):
        moveFallingPiece(0,+1)
    elif (event.keysym =="r"):
        restartGame()
                  
    redrawAll()

def printBoard():
    board=canvas.data.board
    rows=len(board)
    cols=len(board[0])
    for row in range (rows):
        for col in range(cols):
            sys.stderr.write(board[row][col]+" ")

def drawGame():
    drawBackground()
    drawBoard()
    drawFallingPiece()

def drawBoard():
    board = canvas.data.board
    rows = len(board)
    cols = len(board[0])
    for row in range(rows):
        for col in range(cols):
            drawCell(row, col, board[row][col])

def drawBackground():
    #canvas.create_rectangle(-1,-1, canvas.data.width, canvas.data.height, fill="orange")
    pass

def redrawAll():
    if (canvas.data.isGameOver != True):
        drawGame()

def loadBoard( rows, cols ):
    emptyColor="blue"
    canvas.data.board = [ [ emptyColor ] * cols for i in range (rows) ]

    #canvas.data.board[0][0] = "red"
    #canvas.data.board[0][cols-1] = "white"
    #canvas.data.board[rows-1][0] = "green"
    #canvas.data.board[rows-1][cols-1] = "gray"    
    #printBoard()
    sPiece = [
        [ False, True, True ],
        [ True, True, False ]
        ]
    zPiece = [
        [ True, True, False ],
        [ False, True, True ]
        ]
    lPiece = [
        [ False, False, True ],
        [ True, True, True ]
        ]
    jPiece = [
        [ True, False, False ],
        [ True, True, True ]
        ]
    tPiece = [
        [ False, True, False ],
        [ True, True, True ]
        ]
    iPiece = [
        [ True, True, True, True ]
        ]
    oPiece = [
        [ True, True ],
        [ True, True ]
        ]
    canvas.data.tetrisPieces = [iPiece, jPiece, lPiece, oPiece, sPiece, tPiece, zPiece]
    canvas.data.tetrisPieceColors = ["red", "yellow", "magenta", "pink", "cyan", "green", "orange"]

def printInstructions():
    print "Tetris!"
    print "Use the Left or Right arrow key to move the piece."
    print "Press up to turn a piece."
    print "Press Down to accelerate falling!"

def init(rows, cols):
    printInstructions()
    loadBoard(rows, cols)
    canvas.data.inDebugMode = False
    newFallingPiece()
    canvas.data.isGameOver = False
    redrawAll()
    

def run(rows, cols):
    # create the root and the canvas
    global canvas
    root = Tk()
    canvas = Canvas(root, bg="orange", width=310, height=465)
    canvas.pack()

    #add this line so that the window can not be resized
    root.resizable (width=0, height=0)
    
    # Store canvas in root and in canvas itself for callbacks
    root.canvas = canvas.canvas = canvas
    # Set up canvas data and call init
    class Struct: pass
    canvas.data = Struct()

    canvas.data.rows = rows
    canvas.data.cols = cols
    canvas.data.width = 310
    canvas.data.height = 465
    canvas.data.font = tkFont.Font(size=24, weight="bold", family="Helvetica")
    init(rows, cols)

    # set up events
    #root.bind("<Button-1>", mousePressed)
    root.bind("<Key>", keyPressed)
    timerFired()
    # and launch the app
    root.mainloop()  # This call BLOCKS (so your program waits until you close the window!)

run(15, 10)
