import express, { Request, Response } from "express"
import path from "path"
import cors from "cors"
import { serverConfig } from "./config/server"

const server = express()

server.use(cors())
server.use('/public', express.static('./public'))

server.get('/', (req: Request, res: Response) => {
    let indexFilePath = path.join(__dirname, "./public/index.html")
    res.sendFile(indexFilePath)
})

server.listen(serverConfig.port, () => {
    console.log(`Minesweeper server listening on port ${serverConfig.port}.`)
})
