import { Cell } from "./Entities/Cell"

export interface BoardInterface {
    setBoardSize(size: number): void
    setTotalBombs(totalBombs: number): void
    generateBoard(): void
    placeBombs(): void
    placeCellBombsInProximityValues(): void
    findCell(xAxis: number, yAxis: number): Cell | null
}

export interface DrawerInterface {
    draw(): void
}
