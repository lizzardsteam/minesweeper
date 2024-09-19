import express, { Request, Response } from "express"
import pino from "pino"
import cors from "cors"
import { serverConfig } from "./config/server"
import { loggerConfig } from "./config/logger"
import helmet from "helmet"
import bodyParser from "body-parser"
import { handleSuccess } from "./utils/response"

const server = express()
const logger = pino(loggerConfig)

server.use(helmet())
server.use(cors())
server.use('/public', express.static('./public'))
server.use(bodyParser.json())

server.get('/', (req: Request, res: Response) => {
    handleSuccess(res,
        {
            message: "Minesweeper server message."
        },
        "OK")
})

server.listen(serverConfig.port, () => {
    logger.info(`Minesweeper server listening on port ${serverConfig.port}.`)
})
