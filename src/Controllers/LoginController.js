const jwt = require("jsonwebtoken")
const AuthorModel = require("../Models/authorModel")

const authorLogin = async function(req,res){
    let userId = req.body.Email
    let password = req.body.password

    if(!userId || !password) return res.status(400).send({status : false , msg : "Please enter your UserId and Password !!!"})

    let user = await AuthorModel.findOne({ Email : userId , password : password })

    if(!user) return res.status(404).send({status : false , msg : "UserId or Password is incorrect !!!"})

    let token = jwt.sign({authorId : user._id.toString()} , "my-secret-key")

    res.setHeader("x-api-key" , token)
    res.status(200).send({ status : true , data : token })
}

module.exports.authorLogin = authorLogin