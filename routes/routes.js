const Router = require('express').Router();
const {showPosts, addPosts} = require('../controller/posts.js')
const {register,login} = require('../controller/users.js')
const {uploadImage,uploadUserPic} = require('../helpers/multer.js')
const isAdmin = require('passport');
const isLogin = require('passport');
const ensureLogin = isLogin.authenticate('login-rule', { session: false });
const ensureAdmin = isAdmin.authenticate('admin-rule', { session: false });



Router
    .post('/register',uploadUserPic,register)
    .post('/login',login)

Router.route('/newsfeeds')
    .get(ensureLogin,showPosts)
    .post(ensureLogin,uploadImage,addPosts)
module.exports = Router;