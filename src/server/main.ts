import express, { Request, Response } from "express"
import pino from "pino"
import cors from "cors"
import { serverConfig } from "./config/server"
import { loggerConfig } from "./config/logger"

const server = express()
const logger = pino(loggerConfig)

server.use(cors())
server.use('/public', express.static('./public'))

server.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        message: "Minesweeper server message."
    })
})

server.listen(serverConfig.port, () => {
    logger.info(`Minesweeper server listening on port ${serverConfig.port}.`)
})
