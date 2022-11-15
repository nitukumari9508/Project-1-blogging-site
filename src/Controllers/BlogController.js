const { isValidObjectId } = require("mongoose")
const AuthorModel = require("../Models/authorModel")
const BlogsModel = require("../Models/blogModel")

const createBlog = async function(req, res){
try {
    
    let data = req.body
    let authorId = req.body.authorId
    let { title , body , tags , category , subcategory } = req.body

    if(!title || !body || !tags || !category || !subcategory) return res.status(400).send({status: false , msg: "All fields are mandatory."})

    if(!authorId) return res.status(400).send({status: false , msg: "AuthorId is required."})

    let isValidAuthorId = isValidObjectId(authorId)

    if(!isValidAuthorId) return res.status(400).send({status: false , msg: "AuthorId is not a valid ObjectId."})

    let AuthorIdCheck = await AuthorModel.findById(authorId)

    if(!AuthorIdCheck) return res.status(404).send({status: false , msg: "AuthorId is not available."})

    let createdBlog = await BlogsModel.create(data)

    res.status(201).send({ status : true , data : createdBlog })
} catch (err) {
    res.status(500).send({ status : false , msg : err.message })
}
}

const getBlogs = async function(req,res) {

    try{
        
    let filters=req.query

    filters.isDeleted = false
    filters.ispublished = true
    
    let data = await BlogsModel.find(filters)
    if(data.length==0){
    return res.status(404).send({status:false,msg:"No blogs found"})
    }
    res.status(200).send({status:true,Data:data})
} catch (err) {
    res.status(500).send({ status : false , msg : err.message })
}
}

const updateBlogs = async function(req,res){
    try {
    
    let blogId = req.params.blogId
    let { title , body , tags , category , subcategory } = req.body

    if(!blogId) return res.send.status(400).send({ status : false , msg : "BlogId is required." })

    let isavailable = await BlogsModel.findOne({_id : blogId , isDeleted : false})

    if(!isavailable) return res.status(404).send({ status : false , msg : "BlogId not available." })

    let updatedData = await BlogsModel.findOneAndUpdate({ _id : blogId } , { $set:  { publishedAt : new Date() } , ispublished : true , title : title ,  body : body  , category : category ,  $push: { tags : tags , subcategory : subcategory}   } , { new : true })

    res.status(200).send({ status : true , data : updatedData })
} catch (err) {
    res.status(500).send({ status : false , msg : err.message })
}
}

const deleteBlog = async function(req,res){

try {

    let blogId = req.params.blogId

    if(!blogId) return res.status(400).send({ status : false , msg : "BlogId is required." })

    let isavailable = await BlogsModel.findById(blogId)

    if(isavailable.isDeleted === true) return res.status(200).send({ status : false , msg : "BlogId is already deleted." })

    let deletedBlog = await BlogsModel.findOneAndUpdate({ _id : blogId } , { $set : {isDeleted : true , DeletedAt : new Date()}} , { new : true } )

    res.status(200).send({ status : true , data : deletedBlog })

} catch (err) {
    res.status(500).send({ status : false , msg : err.message })
}
}

module.exports.getBlogs=getBlogs
module.exports.createBlog = createBlog
module.exports.updateBlogs = updateBlogs
module.exports.deleteBlog = deleteBlog