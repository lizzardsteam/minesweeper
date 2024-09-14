import Minesweeper from "./Entities/Minesweeper.js"

const boardSize: number = 6
const totalBombs: number = 12

const game = new Minesweeper(boardSize, totalBombs)
game.printBoard()
game.drawBoard()
