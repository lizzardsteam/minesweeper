import User from "../models/users/User";
import { StorageCreation, StorageDeletion, StorageFindAll, StorageUpdate } from "./types";

export default class UserStorage implements StorageCreation, StorageUpdate, StorageDeletion, StorageFindAll<User> {
    public user: User

    public constructor(user: User) {
        this.user = user
    }

    public Create(): boolean {
        return false
    }

    public Update(): boolean {
        return false
    }

    public Delete(): boolean {
        return false
    }

    public FindById(): User {
        return this.user
    }

    public FindByEmail(): User {
        return this.user
    }

    public FindByUsername(): User {
        return this.user
    }

    public FindAll() {
        return []
    }
}
