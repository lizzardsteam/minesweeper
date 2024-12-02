import express, { Response, NextFunction } from "express"
import pino, { Logger } from "pino"
import cors from "cors"
import { serverConfig } from "./config/server"
import { loggerConfig } from "./config/logger"
import helmet from "helmet"
import bodyParser from "body-parser"
import { handleBadRequest, handleSuccess, ServerResponseStatus } from "./utils/response"
import cookieParser from "cookie-parser"
import morgan from "morgan"
import userRoutes from "./routes/userRoutes"
import AuthOnlyRouteMiddleware from "./middleware/AuthOnlyMiddleware"
import { RequestWithLogger } from "./routes/types"
import Minesweeper from "./models/minesweeper/Minesweeper"
import databases from "./database/databases"
import { validate as uuidValidate } from "uuid"
import UserStorage from "./storage/UserStorage"
import User from "./models/users/User"

const server = express()
const logger: Logger = pino(loggerConfig)

server.use((req: RequestWithLogger, res: Response, next: NextFunction) => {
    req.logger = logger
    next()
})
server.use(helmet())
server.use(cors())
server.use(cookieParser())
server.use(bodyParser.json())
server.use(morgan('common'))

server.use('/public', express.static('./public'))

server.get('/', [AuthOnlyRouteMiddleware], (req: RequestWithLogger, res: Response) => {
    handleSuccess(res,
        {
            message: "Minesweeper server message."
        },
        "OK")
})

// Authentication routes
server.use("/", userRoutes)

server.get('/game', [AuthOnlyRouteMiddleware], (req: RequestWithLogger, res: Response) => {
    /**
     * TODO
     * 1. Create new board if none exists or last game is complete.
     * 2. Figure out how to track each click and the board and return data to the client.
     */
    let game = new Minesweeper(10, 24, () => { })
    game.play()

    let authCookie = req.cookies[serverConfig.authCookieName]
    let isAuthCookieValid = uuidValidate(authCookie)
    if (isAuthCookieValid) {
        let userStorage = new UserStorage(new User("", "", "", ""))
        let userId = databases.userTokens.get(authCookie)
        if (userId) {
            let user = userStorage.FindById(userId)
            if (user !== null) {
                databases.currentBoards.set(userId, game.board)
            }
        }

        handleSuccess(res, { game: game, message: "Game created." }, "New game started.")
        return
    }

    handleBadRequest(res, ServerResponseStatus.Unauthenticated, "Authentication failed.")
})

server.listen(serverConfig.port, () => {
    logger.info(`Minesweeper server listening on port ${serverConfig.port}.`)
})
