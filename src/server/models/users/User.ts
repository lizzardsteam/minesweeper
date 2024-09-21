export default class User {
    public id: number
    public username: string
    public email: string
    public passwordHash: string
    public createdAt: Date

    public constructor(id: number, username: string, email: string, passwordHash: string) {
        this.id = id
        this.username = username
        this.email = email
        this.passwordHash = passwordHash
        this.createdAt = new Date()
    }
}
