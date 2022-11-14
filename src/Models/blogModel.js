const mongoose = require('mongoose');
const objectId= mongoose.Schema.Types.objectId

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
        required:true,
        ref: author,
        type:objectId
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
    publishedAt:{
        type:Date,
        default:null
    }


},{timestamps : true});

module.exports = mongoose.model('blog', blogSchema)