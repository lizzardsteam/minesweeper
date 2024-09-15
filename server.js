const express = require("express")
const path = require("path")
const cors = require("cors")

const app = express()
const port = 3000

app.use('/public', express.static('./bin'))
app.use('/static', express.static('./ui'))

app.use(cors())

app.get('/', (req, res) => {
    let indexFilePath = path.join(__dirname, "./ui/index.html")
    res.sendFile(indexFilePath)
})

app.listen(port, () => {
    console.log(`Minesweeper server listening on port ${port}.`)
})
