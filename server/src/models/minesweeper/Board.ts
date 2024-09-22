import BombRNG from "../../utils/BombRNG"
import { Cell } from "./Cell"

const ALLOW_BOMBS_ON_EDGES: boolean = false

const NEGATIVE_SIZE_ERROR_MSG = "Board size cannot be less than 2."
const ZERO_SIZE_ERROR_MSG = "There must be at least 1 bomb on the board."

export class Board  {
    public board: Array<Cell> = []
    public size: number = 0
    public totalBombs: number = 0

    public setBoardSize(size: number): void {
        this.size = size
    }

    public setTotalBombs(totalBombs: number): void {
        this.totalBombs = totalBombs
    }

    public generateBoard(): void {
        if (this.size <= 2) {
            throw new Error(NEGATIVE_SIZE_ERROR_MSG)
        }

        for (let x = 0; x < this.size; x++) {
            for (let y = 0; y < this.size; y++) {
                let cell = new Cell()
                cell.setCoordinates(x + 1, y + 1)
                this.board.push(cell)
            }
        }
    }

    public placeBombs(): void {
        if (this.totalBombs <= 0) {
            throw new Error(ZERO_SIZE_ERROR_MSG)
        }

        let bombsPlaced: number = 0
        for (let cell = 0; ; cell++) {
            if (bombsPlaced === this.totalBombs) {
                break
            }

            // Make sure the cell is never undefined.
            if (cell === (this.size ** 2)) {
                cell = 0
            }

            if (this.board[cell].isBomb) {
                continue
            }

            if (!ALLOW_BOMBS_ON_EDGES) {
                if (cell === 0 || cell === this.size - 1 || cell === (this.size ** 2) - 1 || cell === (this.size ** 2) - this.size) {
                    continue
                }
            }

            let isBomb = BombRNG.generate()
            if (isBomb) {
                bombsPlaced += 1
                this.board[cell].isBomb = isBomb
            }

            if ((bombsPlaced < this.totalBombs && cell === (this.size ** 2) - 1)) {
                cell = 0
            }
        }
    }

    public placeCellBombsInProximityValues(): void {
        this.board.map((cell, index) => {
            if (!cell.isBomb) {
                for (let xOffset = -1; xOffset <= 1; xOffset++) {
                    for (let yOffset = -1; yOffset <= 1; yOffset++) {
                        let currentCell = this.findCell(cell.x + xOffset, cell.y + yOffset)
                        if (currentCell !== null) {
                            if (currentCell?.isBomb) {
                                this.board[index].bombsInProximity += 1
                            }
                        }
                    }
                }
            }
        })
    }

    public findCell(xAxis: number, yAxis: number): Cell | null {
        let returnCell = this.board.find((cell: Cell) => {
            if (cell.x === xAxis && cell.y === yAxis) {
                return cell
            }
        })

        return returnCell ?? null
    }

    public findCellIndex(xAxis: number, yAxis: number): number | null {
        let returnIndex = null
        this.board.find((cell: Cell, index: number) => {
            if (cell.x === xAxis && cell.y === yAxis) {
                returnIndex = index
            }
        })

        return returnIndex
    }
}
