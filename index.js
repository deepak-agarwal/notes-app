const express = require('express')
const configureDB = require('./config/database')
const cors = require('cors')
const router = require('./config/routes')
const app = express()
const port = process.env.PORT || 3005

const path = require('path') 

configureDB()

app.use(express.json())
app.use(cors())

app.use('/api', router)

app.use(express.static(path.join(__dirname,"client/build"))) 
app.get("*",(req,res) => { 
    res.sendFile(path.join(__dirname + "/client/build/index.html")) 
}) 

app.listen(port, () => {
    console.log('listening on port', port)
})