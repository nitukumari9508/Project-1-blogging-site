const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const { default: mongoose } = require('mongoose')
const route = require("./routes/route")

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

mongoose.connect("mongodb+srv://AbhinavSIngh:9936522959@cluster0.wtmx5b4.mongodb.net/bloggingdb"
,{
    useNewUrlParser: true
})

.then(()=> console.log("MongoDb is connected"))
.catch( err => console.log(err))

app.use('/',route)

app.listen(3000,function()
{console.log("express app running on the port 3000")})