import express, { Request, Response } from "express"
import User from "../models/users/User"
import UserStorage from "../storage/UserStorage"
import PasswordHasher from "../utils/PasswordHasher"
import { serverConfig } from "../config/server"
import { v7 as uuidv7, validate as uuidValidate } from "uuid"
import { handleBadRequest, handleSuccess } from "../utils/response"
import { isEmailValid, isPasswordValid, isUsernameValid } from "../utils/validators"

const router = express.Router()

type LoginCredentialsType = {
    username: string
    password: string
}

type RegistrationCredentialsType = {
    username: string
    password: string
    email: string
}

router.post('/login', (req: Request, res: Response) => {
    // Create new auth cookie.
    let loginCredentials: LoginCredentialsType = req.body

    if (loginCredentials) {
        let user: User = new User("", "", "", "")
        let storage = new UserStorage(user)
        user = storage.FindByUsername(loginCredentials.username)

        if (PasswordHasher.validatePassword(loginCredentials.password, user.passwordHash)) {
            res.cookie(serverConfig.authCookieName, uuidv7(), { httpOnly: true, maxAge: (1000 * 60 * 60 * 24) * 30 })
            handleSuccess(res, null, "Login successful")
            return
        }
    }

    handleBadRequest(res, 4, "Username or password is incorrect.")
})

router.post("/register", (req: Request, res: Response) => {
    let regCredentials: RegistrationCredentialsType = req.body

    if (!regCredentials.email || !regCredentials.username || !regCredentials.password) {
        handleBadRequest(res, 2, "Registration credentials are not valid.")
        return
    }

    if (!isEmailValid(regCredentials.email) || !isUsernameValid(regCredentials.username) || !isPasswordValid(regCredentials.password)) {
        handleBadRequest(res, 2, "Registration credentials are not valid.")
        return
    }

    try {
        let user: User = new User("", regCredentials.username, regCredentials.email, PasswordHasher.hashPassword(regCredentials.password))
        let storage = new UserStorage(user)
        let userId = storage.Create()

        if (uuidValidate(userId)) {
            handleSuccess(res, {
                userId: userId
            }, "OK")
        }
    } catch (e: Error | unknown) {
        if (e) {
            handleBadRequest(res, 5, "User already exists.")
            return
        }
    }
})

router.get("/users", (req: Request, res: Response) => {
    let storage = new UserStorage(new User("", "", "", ""))
    console.table(storage.FindAll())

    handleSuccess(res, null, "OK")
})

router.get('/logout', (req: Request, res: Response) => {
    // Delete auth cookie.
    res.clearCookie(serverConfig.authCookieName)
    handleSuccess(res,
        {
            message: "Logout successful."
        },
        "OK")
})

export default router
