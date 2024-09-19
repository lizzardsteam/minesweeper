export default class User {
    public id: number
    public username: string
    public email: string
    public passwordHash: string

    public constructor(username: string, email: string) {
        this.id = 0
        this.username = username
        this.email = email
        this.passwordHash = ""
    }
}
