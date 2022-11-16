const jwt = require("jsonwebtoken");
const blogModel = require("../Models/blogModel");

const authentication = function(req , res , next){
    let token = req.headers["x-api-key"]

if (!token) return res.status(400).send({ status: false, msg: "token must be present" })

    jwt.verify(token, "my-secret-key", function (err , decodedToken) {
        if (err) return res.status(401).send({ status: false, msg: "token is invalid" })
        console.log(decodedToken)
        req.loggedInUser = decodedToken.authorId
        console.log(req.loggedInUser)
        next()
    });
}

const authorization = async function(req , res , next){
    let blogId = req.params.blogId
    let authorId = req.body.authorId

    if(blogId){
        let user = await blogModel.findById(blogId)
        authorId = user.authorId.toString()
    }

    if( authorId !== req.loggedInUser){
        console.log(req.loggedInUser)
        return res.status(403).send({status: false, msg: "Not Authorized !!!"})
    } 
    next()
}

module.exports.authentication = authentication;
module.exports.authorization = authorization;