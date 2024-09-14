export class Cell {
    public x: number = 0
    public y: number = 0
    public isBomb: boolean = false
    public bombsInProximity: number = 0

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
        if (this.isBomb) {
            return "Boom!"
        } else {
            return this.bombsInProximity.toString()
        }
    }
}
