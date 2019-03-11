const Router = require('express').Router();
const {showPosts, addPosts, searchFriends, friendRequest,approveReqOrDltFriend,allUnapprovedRequest} = require('../controller/posts.js')
const {register,login,loginWithGoogle,callbackUri,googleCallBackFunction} = require('../controller/users.js')
const {uploadImage,uploadUserPic} = require('../helpers/multer.js')
const isAdmin = require('passport');
const isLogin = require('passport');

const ensureLogin = isLogin.authenticate('login-rule', { session: false });
const ensureAdmin = isAdmin.authenticate('admin-rule', { session: false });


Router
    .post('/register',uploadUserPic,register)
    .post('/login',login)
    .get('/loginWithGoogle',loginWithGoogle)
    .get('/google/redirect',callbackUri,googleCallBackFunction)

Router.route('/newsfeeds')
    .get(ensureLogin,showPosts)
    .post(ensureLogin,uploadImage,addPosts)
Router
    .get('/searchfriends',searchFriends)
    .get('/friendrequest/:id',ensureLogin,friendRequest)
    .get('/approveReqOrUnfriend/:id',ensureLogin,approveReqOrDltFriend)
    .get('/allUnapprovedRequest',ensureLogin,allUnapprovedRequest)
    // .get('/declineRequest/:id',ensureLogin,declineRequest)
    
module.exports = Router;