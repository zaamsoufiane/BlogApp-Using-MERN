const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true,

    },
    content:{
        type:String,
        
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    author: {
        type: ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Post', postSchema)
