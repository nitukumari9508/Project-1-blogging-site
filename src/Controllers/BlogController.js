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
    res.status(500).send(err.message)
}
}

const getBlogs = async function(req,res) {

<<<<<<< HEAD
    let filters=req.query

    filters.isDeleted = false
    filters.ispublished = true
    
    let data = await BlogsModel.find(filters)
    if(data.length==0){
    return res.status(404).send({status:false,msg:"No blogs found"})
    }
    res.status(200).send({status:true,Data:data})
}

const updateBlogs = async function(req,res){
    let blogId = req.params.blogId
    let { title , body , tags , category , subcategory } = req.body

    if(!blogId) return res.send.status(400).send({ status : false , msg : "BlogId is required." })

    let isavailable = await BlogsModel.findOne({_id : blogId , isDeleted : false})

    if(!isavailable) return res.status(404).send({ status : false , msg : "BlogId not available." })

    let updatedData = await BlogsModel.findOneAndUpdate({ _id : blogId } , { $set:  { publishedAt : new Date() } , ispublished : true , title : title ,  body : body  , category : category ,  $push: { tags : tags , subcategory : subcategory}   } , { new : true })

    res.status(200).send({ status : true , data : updatedData })
=======
    try{

    filters=req.query
    filters.isDeleted = false
    filters.ispublished = true
    
   data = await BlogsModel.find(filters)
   if(data.length==0){
    res.status(404).send({status:false,msg:"No blogs found"})
   }
   res.status(200).send({status:true,Data:data})
}catch(error){
    res.status(400).send({msg:error.message})
}
>>>>>>> c192922ae0f928e4b98bad0aa58afdc6fd9cca9b
}

module.exports.getBlogs=getBlogs
module.exports.createBlog = createBlog
module.exports.updateBlogs = updateBlogs