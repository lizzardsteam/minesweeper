import { Board } from "./Board"

type GameOverFunctionCallbackType = () => void

export const GAME_DEFAULT_MSG = "Minesweeper"
export const GAME_WON_MSG = "You won!"
export const GAME_LOST_MSG = "You detonated a mine!"

const DEFAULT_GAME_STATUS = "Click on any cell to begin the game."

class Minesweeper {
    public board: Board
    public isOver: boolean = false
    public gameStatus: string = ""

    public gameOverCallback: GameOverFunctionCallbackType

    public constructor(boardSize: number, totalBombs: number, gameOverCallback: GameOverFunctionCallbackType) {
        this.board = new Board()
        this.board.setBoardSize(boardSize)
        this.board.setTotalBombs(totalBombs)
        this.gameOverCallback = gameOverCallback
    }

    public play(): void {
        this.gameStatus = DEFAULT_GAME_STATUS
        this.isOver = false
        this.board.board = []
        this.board.generateBoard()
        this.board.placeBombs()
        this.board.placeCellBombsInProximityValues()
    }

    public revealCell(index: number): void {
        let cellsRevealed: number = 0
        for (let i = 0; i < (this.board.size ** 2); i++) {
            if (this.board.board[i].isRevealed) {
                cellsRevealed += 1
            }
        }

        this.gameStatus = `Total bombs: ${this.board.totalBombs}; Cells left to reveal ${((this.board.size ** 2) - 1) - cellsRevealed - this.board.totalBombs};`

        // Handle winning the game.
        if (cellsRevealed === ((this.board.size ** 2) - this.board.totalBombs - 1)) {
            this.isOver = true
            this.gameStatus = GAME_WON_MSG
            this.gameOverCallback()
        }

        this.board.board[index].revealCell()

        // Handle losing the game
        if (this.board.board[index].isBomb) {
            this.isOver = true
            this.gameStatus = GAME_LOST_MSG
            this.gameOverCallback()
            this.board.board.map(cell => cell.isRevealed = true)
        }
    }
}

export default Minesweeper
