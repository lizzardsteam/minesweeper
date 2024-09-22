import express, { Request, Response } from "express"
import User from "../models/users/User"
import UserStorage from "../storage/UserStorage"
import PasswordHasher from "../utils/PasswordHasher"
import { serverConfig } from "../config/server"
import { v7 as uuidv7, validate as uuidValidate } from "uuid"
import { handleBadRequest, handleSuccess, ServerResponseStatus } from "../utils/response"
import { isEmailValid, isPasswordValid, isUsernameValid } from "../utils/validators"
import { RequestWithLogger } from "./types"
import databases from "../database/databases"

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

router.post('/login', (req: RequestWithLogger, res: Response) => {
    // Create new auth cookie.
    let loginCredentials: LoginCredentialsType = req.body

    if (loginCredentials) {
        let user: User = new User("", "", "", "")
        let storage = new UserStorage(user)
        user = storage.FindByUsername(loginCredentials.username)

        if (PasswordHasher.validatePassword(loginCredentials.password, user.passwordHash)) {
            let sessionToken = uuidv7()
            databases.userTokens.set(sessionToken, user.id)

            res.cookie(serverConfig.authCookieName, sessionToken, { httpOnly: true, maxAge: (1000 * 60 * 60 * 24) * 30 })

            handleSuccess(res, null, "Login successful")
            return
        }
    }

    handleBadRequest(res, ServerResponseStatus.AuthCredentialsNotValid, "Username or password is incorrect.")
})

router.post("/register", (req: RequestWithLogger, res: Response) => {
    let regCredentials: RegistrationCredentialsType = req.body

    if (!regCredentials.email || !regCredentials.username || !regCredentials.password) {
        handleBadRequest(res, ServerResponseStatus.AuthCredentialsNotValid, "Registration credentials are not valid.")
        return
    }

    if (!isEmailValid(regCredentials.email) || !isUsernameValid(regCredentials.username) || !isPasswordValid(regCredentials.password)) {
        handleBadRequest(res, ServerResponseStatus.AuthCredentialsNotValid, "Registration credentials are not valid.")
        return
    }

    try {
        let user: User = new User("", regCredentials.username, regCredentials.email, PasswordHasher.hashPassword(regCredentials.password))
        let storage = new UserStorage(user)
        let userId = storage.Create()

        if (uuidValidate(userId)) {
            req.logger?.info(`New user created with username ${user.username} and id ${userId}.`)
            handleSuccess(res, {
                userId: userId
            }, "OK")
        }
    } catch (e: Error | unknown) {
        if (e) {
            handleBadRequest(res, ServerResponseStatus.UsernameOrEmailAlreadyExist, "User already exists.")
            return
        }
    }
})

router.get("/users", (req: RequestWithLogger, res: Response) => {
    let storage = new UserStorage(new User("", "", "", ""))
    console.table(storage.FindAll())

    handleSuccess(res, null, "OK")
})

router.get('/logout', (req: RequestWithLogger, res: Response) => {
    // Delete auth cookie.
    res.clearCookie(serverConfig.authCookieName)
    handleSuccess(res,
        {
            message: "Logout successful."
        },
        "OK")
})

export default router
