const express = require("express")
const path = require("path")
const cors = require("cors")

const app = express()
const port = 3000

app.use('/bin', express.static('./bin'))
app.use('/public', express.static('./public'))

app.use(cors())

app.get('/', (req, res) => {
    let indexFilePath = path.join(__dirname, "./public/index.html")
    res.sendFile(indexFilePath)
})

app.listen(port, () => {
    console.log(`Minesweeper server listening on port ${port}.`)
})
