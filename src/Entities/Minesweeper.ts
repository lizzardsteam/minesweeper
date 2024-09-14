import { Board } from "./Board"

class Minesweeper {
    public board: Board

    public constructor(boardSize: number, totalBombs: number) {
        this.board = new Board()
        this.board.setBoardSize(boardSize)
        this.board.generateBoard()
        this.board.setTotalBombs(totalBombs)
        this.board.placeBombs()
        console.log(this.board.board)
    }
}

export default Minesweeper
