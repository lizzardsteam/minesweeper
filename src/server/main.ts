import express, { Request, Response, NextFunction } from "express"
import pino from "pino"
import cors from "cors"
import { serverConfig } from "./config/server"
import { loggerConfig } from "./config/logger"
import helmet from "helmet"
import bodyParser from "body-parser"
import { handleBadRequest, handleSuccess } from "./utils/response"
import cookieParser from "cookie-parser"
import morgan from "morgan"
import userRoutes from "./routes/userRoutes"
import AuthOnlyRouteMiddleware from "./middleware/AuthOnlyMiddleware"

const server = express()
const logger = pino(loggerConfig)

server.use(helmet())
server.use(cors())
server.use(cookieParser())
server.use(bodyParser.json())
server.use(morgan('common'))

server.use('/public', express.static('./public'))

server.get('/', [AuthOnlyRouteMiddleware], (req: Request, res: Response) => {
    handleSuccess(res,
        {
            message: "Minesweeper server message."
        },
        "OK")
})

// TODO: At first store games inside a Map<uuidv7, Board>.

// Authentication routes
server.use("/", userRoutes)

server.listen(serverConfig.port, () => {
    logger.info(`Minesweeper server listening on port ${serverConfig.port}.`)
})
