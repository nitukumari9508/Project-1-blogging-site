const authorModel = require("../Models/authorModel")
const emailValidator = require("email-validator")
const authors = async function (req,res){
if(emailValidator.validate(req.body.Email)){
    const data = req.body
    const result = await authorModel.create(data)
    res.send({msg:result})}

  else{
return res.send("emailid is not valid")
  } 

}

module.exports.authors=authors
