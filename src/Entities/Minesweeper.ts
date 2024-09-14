import BoardDrawer from "../Utils/BoardDrawer.js"
import { Board } from "./Board.js"

class Minesweeper {
    public board: Board

    public constructor(boardSize: number, totalBombs: number) {
        this.board = new Board()
        this.board.setBoardSize(boardSize)
        this.board.generateBoard()
        this.board.setTotalBombs(totalBombs)
        this.board.placeBombs()
        this.board.placeCellBombsInProximityValues()
    }

    public printBoard() {
        console.table(this.board.board)
    }

    public drawBoard() {
        let drawer = new BoardDrawer(this.board)
        drawer.draw()
    }
}

export default Minesweeper
