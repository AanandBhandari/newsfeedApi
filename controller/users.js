const {User} = require('../models/User.js')
const {validateRegistered}= require('../validation/validation.js');
const bcrypt = require("bcryptjs");
exports.register = async(req,res) => {
    const { error } = validateRegistered(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User already exists!");

    if(req.file !== undefined){
        req.body.image = 'profilePic/'+req.file.filename;
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
    
    
}