import express, { Request, Response, NextFunction } from "express"
import pino from "pino"
import cors from "cors"
import { serverConfig } from "./config/server"
import { loggerConfig } from "./config/logger"
import helmet from "helmet"
import bodyParser from "body-parser"
import { handleBadRequest, handleSuccess } from "./utils/response"
import cookieParser from "cookie-parser"
import { v7 as uuidv7, validate as uuidValidate } from "uuid"
import { isEmailValid, isPasswordValid, isUsernameValid } from "./utils/validators"
import User from "./models/users/User"
import PasswordHasher from "./utils/PasswordHasher"
import UserStorage from "./storage/UserStorage"

const server = express()
const logger = pino(loggerConfig)

server.use(helmet())
server.use(cors())
server.use(cookieParser())
server.use('/public', express.static('./public'))
server.use(bodyParser.json())

const AuthOnlyRouteMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // Check if auth cookie is valid.
    let authCookie = req.cookies[serverConfig.authCookieName]
    let isAuthCookieValid = uuidValidate(authCookie)

    if (!isAuthCookieValid) {
        handleBadRequest(res, 4, "Authenitaction required")
        return
    } else {
        next()
    }
}

server.get('/', [AuthOnlyRouteMiddleware], (req: Request, res: Response) => {
    handleSuccess(res,
        {
            message: "Minesweeper server message."
        },
        "OK")
})

// TODO: At first store games inside a Map<uuidv7, Board>.
type LoginCredentialsType = {
    username: string
    password: string
}

type RegistrationCredentialsType = {
    username: string
    password: string
    email: string
}

server.post('/login', (req: Request, res: Response) => {
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

server.post("/register", (req: Request, res: Response) => {
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

server.get("/users", (req: Request, res: Response) => {
    let storage = new UserStorage(new User("", "", "", ""))
    console.table(storage.FindAll())

    handleSuccess(res, null, "OK")
})

server.get('/logout', (req: Request, res: Response) => {
    // Delete auth cookie.
    res.clearCookie(serverConfig.authCookieName)
    handleSuccess(res,
        {
            message: "Logout successful."
        },
        "OK")
})

server.listen(serverConfig.port, () => {
    logger.info(`Minesweeper server listening on port ${serverConfig.port}.`)
})
