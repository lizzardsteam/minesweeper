import Minesweeper from "./Entities/Minesweeper.js"

const boardSize: number = 6
const totalBombs: number = 8

const game = new Minesweeper(boardSize, totalBombs, gameOverCallback)
game.drawBoard()
setSubheaderStatus()

// Handle cell clicks.
addEventListener("load", () => {
    let elementIdsArray = getHtmlElementsArray()

    elementIdsArray.map(elementId => {
        let cellHtmlElement = document.getElementById(elementId)
        if (cellHtmlElement) {
            cellHtmlElement.addEventListener("click", () => {
                let index = findCellIndexByHtmlElementId(elementId)
                if (index !== null) {
                    if (!game.board.board[index].isRevealed) {
                        cellHtmlElement.innerHTML = game.revealCell(index)
                        setSubheaderStatus()
                    }
                }
            })
        }
    })
})

function findCellIndexByHtmlElementId(elementId: string) {
    let x: number = 0
    let y: number = 0

    let xy = elementId.split("_")
    x = parseInt(xy[0].split("-")[1])
    y = parseInt(xy[1].split("-")[1])
    return game.board.findCellIndex(x, y)
}

function getHtmlElementsArray(): string[] {
    let elementIdsArray: string[] = []

    for (let x = 0; x < game.board.size; x++) {
        for (let y = 0; y < game.board.size; y++) {
            elementIdsArray.push(`x-${x + 1}_y-${y + 1}`)
        }
    }

    return elementIdsArray
}

function setSubheaderStatus() {
    let gameSubheader = document.getElementById("minesweeper-subheader")
    if (gameSubheader) {
        gameSubheader.innerText = game.gameStatus
    }
}

function gameOverCallback() {
    let elementIdsArray = getHtmlElementsArray()

    elementIdsArray.map(elementId => {
        let cellHtmlElement = document.getElementById(elementId)
        if (cellHtmlElement) {
            let index = findCellIndexByHtmlElementId(elementId)
            if (index !== null) {
                cellHtmlElement.innerHTML = game.board.board[index].revealCell()
            }
        }
    })

    let gameHeader = document.getElementById("minesweeper-header")
    if (gameHeader) {
        gameHeader.innerText = "GAME OVER!"
    }
    setSubheaderStatus()
}
