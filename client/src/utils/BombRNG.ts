export default class BombRNG {
    public constructor() { }

    public static generate(): boolean {
        let min: number = 0
        let max: number = 100
        let result: number = Math.floor(Math.random() * (max - min + 1) + min)

        return result >= 80
    }
}
