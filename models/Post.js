const mongoose = require('mongoose')
const Schema = mongoose.Schema
const PostSchema = new Schema({
    images : [],
    date : {
        type : Date,
        default : Date.now
    },
    description : {
        type : String
    }
})
exports.AddPosts = mongoose.model('addPosts', PostSchema)