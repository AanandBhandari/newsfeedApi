const mongoose = require('mongoose')
const Schema = mongoose.Schema
const PostSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "user"
      },  
    images : [],
    date : {
        type : Date,
        default : Date.now
    },
    description : {
        type : String
    }
})
exports.Post = mongoose.model('Post', PostSchema)