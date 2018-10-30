const Router = require('express').Router();
const Posts = require('../controller/posts.js')
Router.route('/')
.get(Posts.showPosts)
module.exports = Router;