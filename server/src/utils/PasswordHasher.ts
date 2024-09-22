import bcrypt from "bcrypt"

export default class PasswordHasher {
    public static hashPassword(password: string): string {
        const salt = bcrypt.genSaltSync(7)
        const hash = bcrypt.hashSync(password, salt)
        return hash
    }

    public static validatePassword(password: string, hash: string): boolean {
        let isValid = bcrypt.compareSync(password, hash)
        return isValid
    }
}
