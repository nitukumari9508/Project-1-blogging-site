const express = require("express")
const route = require("./route/route")
// const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const { default: mongoose } = require('mongoose')
const port = 3000


const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

mongoose.connect("mongodb+srv://AbhinavSIngh:9936522959@cluster0.wtmx5b4.mongodb.net/bloggingdb"
,{
    useNewUrlParser: true
})

.then(()=> console.log("MongoDb is connected"))
.catch( err => console.log(err))

app.use('/',route)
app.listen(port,function()
{console.log("express app running on the port 3000")})

