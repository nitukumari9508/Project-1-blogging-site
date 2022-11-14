const { isValidObjectId } = require("mongoose")
const AuthorModel = require("../Models/authorModel")
const BlogsModel = require("../Models/blogModel")

const createBlog = async function(req, res){
try {
    
    let data = req.body
    let authorId = req.body.authorId
    // let { title , body , authorId , tags , category , subcategory } = req.body

    // if(!title || !body || !authorId || !tags || !category || !subcategory) return res.status(400).send({status: false , msg: "All fields are mandatory."})

    if(!authorId) return res.status(400).send({status: false , msg: "AuthorId is required."})

    let isValidAuthorId = isValidObjectId(authorId)

    if(!isValidAuthorId) return res.status(400).send({status: false , msg: "AuthorId is not a valid ObjectId."})

    let AuthorIdCheck = await AuthorModel.findById(authorId)

    if(!AuthorIdCheck) return res.status(404).send({status: false , msg: "AuthorId is not available."})

    let createdBlog = await BlogsModel.create(data)

    res.status(201).send({ status : true , data : createdBlog })
} catch (err) {
    res.status(500).send(err.message)
}
}

const getBlogs = async function(req,res) {
    filters=req.query
    filters.isDeleted = false
    filters.ispublished = true
    
   data = await BlogsModel.find(filters)
   if(data.length==0){
    res.status(404).send({status:false,msg:"No blogs found"})
   }
   res.status(200).send({status:true,Data:data})
}

module.exports.getBlogs=getBlogs



module.exports.createBlog = createBlog