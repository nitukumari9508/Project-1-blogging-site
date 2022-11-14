const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    firstname:{
        type: String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    title:{
        required:true,
        enum: ["Mr","Mrs","Miss"]
    },
    Email:{
        required: true,
        unique: true,
        type: String

    },
    password:{
        type: String,
        required : true

    }, timestamps: true });

    module.exports = mongoose.model('author', authorSchema)

