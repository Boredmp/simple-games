#!/usr/bin/env python
import tetris
import unittest

from test_grids import TestGrids

class CreateGrid(unittest.TestCase):
    def setUp(self):
        # Grid(1,1)
        self.expected_1 = [[0]]
        # Grid(2,2)
        self.expected_2 = [[0, 0], [0, 0]]
        # Grid(5,3)
        self.expected_3 = [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]]
        # Grid(15,10)
        self.expected_4 = TestGrids.empty

    def test_1x1_grid(self):
        grid_1 = tetris.Grid(1,1)
        self.assertEqual(grid_1.grid, self.expected_1)

    def test_2x2_grid(self):
        grid_2 = tetris.Grid(2,2)
        self.assertEqual(grid_2.grid, self.expected_2)

    def test_5x3_grid(self):
        grid_3 = tetris.Grid(5,3)
        self.assertEqual(grid_3.grid, self.expected_3)

    def test_15x10_grid(self):
        grid_4 = tetris.Grid(15,10)
        self.assertEqual(grid_4.grid, self.expected_4)

class InsertBlock(unittest.TestCase):
    def setUp(self):
        self.grid = tetris.Grid(15,10)
        self.o_block = self.choose_block('o', 0)

    def choose_block(self, this_shape, rotation):
        shapes = {'s':0, 'z':1, 'l':2, 'j':3, 't':4, 'i':5, 'o':6}
        block = tetris.Block()
        block.new_block()
        if (rotation > len(block.blocks[shapes[this_shape]])):
            fail("Rotation index out of range")
        block.shape = shapes[this_shape]
        block.rotation = rotation
        block.current = block.blocks[block.shape][block.rotation]
        return block
        
    def test_o_block_start(self):
        self.o_block.x = 4
        self.o_block.y = 0
        self.grid.insert_block(self.o_block)
        self.assertEqual(self.grid.grid, TestGrids.o_start)

    def test_o_bottom_right(self):
        self.o_block.x = 8
        self.o_block.y = 13
        self.grid.insert_block(self.o_block)
        self.assertEqual(self.grid.grid, TestGrids.o_start)
        
if __name__ == "__main__":
    unittest.main()
