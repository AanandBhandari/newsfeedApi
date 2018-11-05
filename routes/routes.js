const Router = require('express').Router();
const {showPosts, addPosts} = require('../controller/posts.js')
const {register} = require('../controller/users.js')
const {uploadImage,uploadUserPic} = require('../helpers/multer.js')


Router
    .post('/register',uploadUserPic,register)

Router.route('/newsfeeds')
    .get(showPosts)
    .post(uploadImage,addPosts)
module.exports = Router;