import BoardDrawer from "../Utils/BoardDrawer.js"
import { Board } from "./Board.js"

type GameOverFunctionCallbackType = () => void

const GAME_WON_MSG = "You won!"
const GAME_LOST_MSG = "Game lost!"

class Minesweeper {
    public board: Board
    public isOver: boolean = false
    public gameStatus: string = "Click on any cell to begin the game."

    public gameOverCallback: GameOverFunctionCallbackType

    public constructor(boardSize: number, totalBombs: number, gameOverCallback: GameOverFunctionCallbackType) {
        this.board = new Board()
        this.board.setBoardSize(boardSize)
        this.board.generateBoard()
        this.board.setTotalBombs(totalBombs)
        this.board.placeBombs()
        this.board.placeCellBombsInProximityValues()
        this.gameOverCallback = gameOverCallback
    }

    public drawBoard() {
        let drawer = new BoardDrawer(this.board)
        drawer.draw()
    }

    public revealCell(index: number): string {
        let cellsRevealed: number = 0
        for (let i = 0; i < (this.board.size ** 2); i++) {
            if (this.board.board[i].isRevealed) {
                cellsRevealed += 1
            }
        }

        this.gameStatus = `Total bombs: ${this.board.totalBombs}; Cells left to reveal ${(this.board.size ** 2) - cellsRevealed - this.board.totalBombs};`

        // Handle winning the game.
        if (cellsRevealed === ((this.board.size ** 2) - this.board.totalBombs - 1)) {
            this.isOver = true
            this.gameStatus = GAME_WON_MSG
            this.gameOverCallback()
        }

        let returnValue = this.board.board[index].revealCell()

        // Handle losing the game
        if (this.board.board[index].isBomb) {
            this.isOver = true
            this.gameStatus = GAME_LOST_MSG
            this.gameOverCallback()
            this.board.board.map(cell => cell.isRevealed = true)
        }

        return returnValue
    }
}

export default Minesweeper
