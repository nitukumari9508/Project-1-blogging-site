const authorModel = require("../Models/authorModel")
const emailValidator = require("email-validator")

const authors = async function (req,res){

try {
    if(emailValidator.validate(req.body.Email)){
        const data = req.body
        const result = await authorModel.create(data)
        res.status(201).send({msg:result})
    } else return res.status(400).send("emailid is not valid")
} catch (err) {
    res.status(500).send(err.message)
}
}

module.exports.authors=authors
