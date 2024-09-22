import databases from "../database/databases";
import User from "../models/users/User";
import { v7 as uuidv7 } from "uuid"
import { StorageCreation, StorageDeletion, StorageFindAll, StorageUpdate } from "./types";

export default class UserStorage implements StorageCreation, StorageUpdate, StorageDeletion, StorageFindAll<User> {
    public user: User

    public constructor(user: User) {
        this.user = user
    }

    public Create(): string {
        let userAlreadyExists: boolean = false
        databases.users.forEach((value, key) => {
            if (value.username === this.user.username || value.email === this.user.email) {
                userAlreadyExists = true
            }
        })

        if (userAlreadyExists) {
            throw new Error("User already exists.")
        }

        let userId: string = uuidv7()
        this.user.id = userId
        databases.users.set(userId, this.user)
        return userId
    }

    public Update(): boolean {
        if (!databases.users.has(this.user.id)) {
            return false
        }

        let record = databases.users.get(this.user.id)
        if (record) {
            if (record.email === this.user.email) {
                databases.users.set(this.user.id, this.user)
                return true
            }
        }

        return false
    }

    public Delete(): boolean {
        if (databases.users.has(this.user.id)) {
            databases.users.delete(this.user.id)
            return true
        }

        return false
    }

    public FindById(id: string): User | null {
        if (databases.users.has(id)) {
            let user = databases.users.get(id)
            if (user) {
                this.user = user
            } else {
                return null
            }
        } else {
            return null
        }

        return this.user
    }

    public FindByEmail(email: string): User | null {
        let user: User | null = null

        databases.users.forEach((value, key) => {
            if (value.email === email) {
                user = value
            }
        })

        if (user !== null) {
            this.user = user
        }

        return this.user
    }

    public FindByUsername(username: string): User {
        let user: User | null = null

        databases.users.forEach((value, key) => {
            if (value.username === username) {
                user = value
            }
        })

        if (user !== null) {
            this.user = user
        }

        return this.user
    }

    public FindAll(): User[] {
        let users: User[] = []

        databases.users.forEach((value, key) => users.push(value))

        return users
    }
}
