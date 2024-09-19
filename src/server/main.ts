import express, { Request, Response } from "express"
import pino from "pino"
import cors from "cors"
import { serverConfig } from "./config/server"
import { loggerConfig } from "./config/logger"
import helmet from "helmet"

const server = express()
const logger = pino(loggerConfig)

server.use(helmet())
server.use(cors())
server.use('/public', express.static('./public'))

server.get('/', (req: Request, res: Response) => {
    res.header("Content-Type", "application/json")
    res.status(200).json({
        message: "Minesweeper server message."
    })
})

server.listen(serverConfig.port, () => {
    logger.info(`Minesweeper server listening on port ${serverConfig.port}.`)
})
