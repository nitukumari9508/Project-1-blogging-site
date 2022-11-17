const authorModel = require("../Models/authorModel")
const emailValidator = require("email-validator")
const jwt = require("jsonwebtoken")

const authors = async function (req, res) {

    try {
        
        const data = req.body
        const {firstname , lastname , title , Email , password} = req.body

        if(!firstname) return res.status(400).send({ status: false, message: "Firstname is required." })
        if(!lastname) return res.status(400).send({ status: false, message: "Lasttitlename is required." })
        if(!title) return res.status(400).send({ status: false, message: "Title is required." })
        if(!Email) return res.status(400).send({ status: false, message: "Email is required." })
        if(!password) return res.status(400).send({ status: false, message: "Password is required." })
        
        const validName = (/^[a-zA-Z .]{3,20}$/)
        const isValidPassword = (/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,12}$/)

        if (!validName.test(firstname)) return res.status(400).send({ status: false, message: "Invalid firstname" })

        if (!validName.test(lastname)) return res.status(400).send({ status: false, message: "Invalid lastname" })
        
        if (!(["Mr", "Mrs", "Miss"].includes(title))) return res.status(400).send({
            status: false, msg: "You can use only Mr, Mrs, Miss in title."})
            
        if (!emailValidator.validate(Email)) return res.status(400).send("Email Id is not valid")
            
        if (!isValidPassword.test(password)) return res.status(400).send({ status: false, message: "Invalid password" })

        const result = await authorModel.create(data)
        res.status(201).send({ msg: result })
    } catch (err) {
        res.status(500).send(err.message)
    }
}

const authorLogin = async function(req,res){
    try{
    
        let userId = req.body.Email
        let password = req.body.password
    
        if(!userId || !password) return res.status(400).send({status : false , msg : "Please enter your UserId and Password !!!"})
    
        if(!emailValidator.validate(userId)) return res.status(400).send({status : false , msg : "Email id is invalid"})
    
        let user = await AuthorModel.findOne({ Email : userId , password : password })
    
        if(!user) return res.status(404).send({status : false , msg : "UserId or Password is incorrect !!!"})
    
        let token = jwt.sign({authorId : user._id.toString()} , "my-secret-key")
    
        res.setHeader("x-api-key" , token)
        res.status(200).send({ status : true , data : token })
    }catch(error){res.status(500).send({status : false , msg : error.message})}
    }
    
module.exports = { authorLogin , authors }
