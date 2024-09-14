import Minesweeper from "./Entities/Minesweeper"

const boardSize: number = 5
const totalBombs: number = 8

const game = new Minesweeper(boardSize, totalBombs)
game.printBoard()
