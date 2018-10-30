const Router = require('express').Router();
const Posts = require('../controller/posts.js')
const {uploadImage} = require('../helpers/multer.js')
Router.route('/')
.get(Posts.showPosts)
.post(uploadImage,Posts.addPosts)
module.exports = Router;