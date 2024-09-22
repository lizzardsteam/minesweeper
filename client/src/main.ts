import Minesweeper, { GAME_DEFAULT_MSG } from "./entities/Minesweeper.js"
import BoardDrawer from "./utils/BoardDrawer.js"

const boardSize: number = 5
const totalBombs: number = 6

const game = new Minesweeper(boardSize, totalBombs, gameOverCallback)
game.play()

let drawer = new BoardDrawer(game.board)
drawer.draw()

// Add event listener to each cell in order to reveal its' content by clicking.
addEventListener("load", () => {
    let elementIdsArray = getHtmlElementsArray()

    elementIdsArray.map(elementId => {
        let cellHtmlElement = document.getElementById(elementId)
        if (cellHtmlElement) {
            cellHtmlElement.addEventListener("click", () => {
                let index = findCellIndexByHtmlElementId(elementId)
                if (index !== null) {
                    if (!game.board.board[index].isRevealed) {
                        if (cellHtmlElement) {
                            cellHtmlElement.innerHTML = game.revealCell(index)
                            setSubheaderStatus()
                        }
                    }
                }
            })
        }
    })
})

// Hide replay button and give it an event listener to reset the game.
let replayButton = document.getElementById("minesweeper-replay")
if (replayButton) {
    replayButton.addEventListener("click", () => {
        game.play()
        resetBoardCells()

        let gameHeader = document.getElementById("minesweeper-header")
        if (gameHeader) {
            gameHeader.innerText = GAME_DEFAULT_MSG
        }
        setSubheaderStatus()
        showReplayButton(false)
    })
}

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

function showReplayButton(isVisible: boolean) {
    let replayButton = document.getElementById("minesweeper-replay")
    if (replayButton) {
        if (isVisible) {
            replayButton.className = "btn pointer d-block"
        } else {
            replayButton.className = "btn pointer d-none"
        }

    }
}

function resetBoardCells() {
    let elementIdsArray = getHtmlElementsArray()

    elementIdsArray.map(elementId => {
        let cellHtmlElement = document.getElementById(elementId)
        if (cellHtmlElement) {
            cellHtmlElement.innerHTML = ""
        }
    })
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
    showReplayButton(true)
}
