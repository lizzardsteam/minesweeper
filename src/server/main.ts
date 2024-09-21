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

server.get('/login', (req: Request, res: Response) => {
    // Create new auth cookie.
    res.cookie(serverConfig.authCookieName, uuidv7(), { httpOnly: true, maxAge: (1000 * 60 * 60 * 24) * 30 })

    handleSuccess(res,
        {
            message: "Login successful."
        },
        "OK")
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
