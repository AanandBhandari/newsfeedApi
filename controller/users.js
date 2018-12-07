const {User} = require("../models/User.js");
const {validateRegistered,validateLoginUser}= require('../validation/validation.js');
const {secretKey,expireTime} = require('../config/keys.js')
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const passportGoogle = require('passport');
exports.loginWithGoogle = passportGoogle.authenticate('google',{scope:['profile','email']});
exports.callbackUri = passportGoogle.authenticate('google',{ session: false });
exports.googleCallBackFunction = async(req,res) => {
    const payload = {id : req.user.id, name : req.user.name, isAdmin : req.user.isAdmin};
    jwt.sign(payload,secretKey, {expiresIn : expireTime}, (err,token) => {
        res.json({
            success : true,
            token : token
        });
    });
}

exports.register = async(req,res) => {
    const { error } = validateRegistered(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User already exists!");

    if(req.file !== undefined){
        req.body.image = 'profilePic'+req.file.filename;
        }else{
        req.body.image = 'no Image!';
        }
    
  
        let newUser = new User ({
            name : req.body.name,
            lastName : req.body.lastName,
            email : req.body.email,
            password: req.body.password,
            pic: req.body.image
            })

        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(newUser.password, salt);

        newUser = await newUser.save();
        res.status(201).json(newUser)
    
    
};

exports.login = async(req,res) => {
    
    const {error} = validateLoginUser(req.body)
    if (error) return res.status(400).send(error.details[0].message);
    const user = await User.findOne({email : req.body.email});
    if(!user) return res.status(400).json('no user found!');
    const isAuth = await bcrypt.compare(req.body.password, user.password);
    if (!isAuth) return res.status(400).json("Password did not match");
    const payload = {id : user.id, name : user.name, isAdmin : user.isAdmin};
    jwt.sign(payload,secretKey, {expiresIn : expireTime}, (err,token) => {
        res.json({
            success : true,
            token : token
        });
    });
    
  
};

