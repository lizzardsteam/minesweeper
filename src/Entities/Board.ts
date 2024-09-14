import BombRNG from "../Utils/BombRNG"
import { Cell } from "./Cell"

export interface BoardInterface {
    generateBoard(): void
}

export class Board implements BoardInterface {
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
        if (this.size <= 0) {
            throw new Error("Board size cannot be less than 0.")
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
            throw new Error("There must be at least 1 bomb on the board.")
        }

        let bombsPlaced: number = 0
        for (let cell = 0; ; cell++) {
            if (bombsPlaced === this.totalBombs) {
                break
            }
            if (this.board[cell].isBomb) {
                continue
            }

            let isBomb = BombRNG.generate()
            if (isBomb) {
                bombsPlaced += 1
                this.board[cell].isBomb = isBomb
            }

            if (bombsPlaced < this.totalBombs && cell === (this.size ** 2) - 1) {
                cell = 0
            }
        }
    }
}
