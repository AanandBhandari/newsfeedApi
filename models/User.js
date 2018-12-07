const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    name :{
        type : String,
        required : true,
    },
    lastName : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String
    },
    pic : {
        type : String,
    },
    date : {
        type : Date,
        default : Date.now
    },
    isAdmin : {
        type : Boolean,
        default : false
    },
    googleId : String,
    friends : [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: "user"
              },
              approveRequest : {
                type : Boolean,
                default : false
            }
        }
    ]
})

exports.User = mongoose.model('user', UserSchema);
