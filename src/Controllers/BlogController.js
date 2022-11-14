const { idValidObjectId } = require("mongoose")
const AuthorModel = require("../models/authorModel")
const BlogsModel = require("../models/blogsModel")

const createBlog = async function(req, res){
try {
    
    let data = req.body
    let authorId = req.body.authorId
    // let { title , body , authorId , tags , category , subcategory } = req.body

    // if(!title || !body || !authorId || !tags || !category || !subcategory) return res.status(400).send({status: false , msg: "All fields are mandatory."})

    if(!authorId) return res.status(400).send({status: false , msg: "AuthorId is required."})

    let isValidAuthorId = idValidObjectId(authorId)

    if(!isValidAuthorId) return res.status(400).send({status: false , msg: "AuthorId is not a valid ObjectId."})

    let AuthorIdCheck = await AuthorModel.findById(authorId)

    if(!AuthorIdCheck) return res.status(404).send({status: false , msg: "AuthorId is not available."})

    let createdBlog = await BlogsModel.create(data)

    res.status(201).send({ status : true , data : createdBlog })
} catch {
    res.status().send
}
}

module.exports.createBlog = createBlog