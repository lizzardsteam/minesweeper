import { Board } from "../Entities/Board.js";
import { Cell } from "../Entities/Cell.js";

export default class BoardDrawer {
    public board: Board
    private htmlElementId: string = "minesweeper-board"

    public constructor(board: Board) {
        this.board = board
    }

    public getCellContnet(x: number, y: number): string {
        let cell = this.board.findCell(x, y)
        if (cell !== null) {
            if (cell.isBomb) {
                return "&#x1f4a3;"
            } else {
                return cell.bombsInProximity.toString()
            }
        }
        return "???"
    }

    public draw() {
        addEventListener("load", () => {
            let htmlElement = document.getElementById(this.htmlElementId)
            if (htmlElement) {
                for (let x = 0; x < this.board.size; x++) {
                    let elementToAppend: string = ""
                    for (let y = 0; y < this.board.size; y++) {
                        elementToAppend += `<div class="minesweeper-cell" id="x-${x + 1}_y-${y + 1}"></div>`
                    }
                    htmlElement.innerHTML += `<div class="minesweeper-column">${elementToAppend}</div>`
                }
            }
        })
    }
}
