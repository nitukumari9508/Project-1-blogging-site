const mongoose = require('mongoose');
const ObjectId= mongoose.Schema.Types.ObjectId

const blogSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    body:{
        type:String,
        required:true
    },
    authorId:{
        type: ObjectId,
        required:true,
        ref: 'author'
    },
    tags:[],
    category:{
        type:String,
        required:true
    },
    subcategory:[],
    ispublished:{
        type:Boolean,
        default:false
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
    DeletedAt: Date,
    publishedAt:{
        type:Date,
        default: new Date()
    }


},{timestamps : true});

module.exports = mongoose.model('blog', blogSchema)