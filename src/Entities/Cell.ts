export class Cell {
    public x: number = 0
    public y: number = 0
    public isBomb: boolean = false
    public bombsInProximity: number = 0
    public isRevealed: boolean = false

    public setCoordinates(x: number, y: number): void {
        this.x = x
        this.y = y
    }

    public makeBomb() {
        this.isBomb = true
    }

    public setBombsInProximity(amount: number): void {
        this.bombsInProximity = amount
    }

    public revealCell(): string {
        this.isRevealed = true
        if (this.isBomb) {
            return "&#x1f4a3;"
        } else {
            return this.bombsInProximity.toString()
        }
    }
}
