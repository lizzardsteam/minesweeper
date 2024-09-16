import { Board } from "../Entities/Board.js";
import { DrawerInterface } from "../types.js";

export default class BoardDrawer implements DrawerInterface {
    public board: Board
    private htmlElementId: string = "minesweeper-board"

    public constructor(board: Board) {
        this.board = board
    }

    public draw(): void {
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
