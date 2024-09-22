export default class UserAchievement {
    public userId: number
    public points: number
    public flagUnlocked: boolean

    public constructor(userId: number, points: number, flagUnlocked: boolean) {
        this.userId = userId
        this.points = points
        this.flagUnlocked = flagUnlocked
    }
}
