import Minesweeper from "./Entities/Minesweeper.js"

const boardSize: number = 5
const totalBombs: number = 8

const game = new Minesweeper(boardSize, totalBombs)
game.printBoard()
game.drawBoard()
