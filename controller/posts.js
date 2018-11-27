const {AddPosts} = require('../models/Post.js')
exports.showPosts = async (req,res) => {
    // console.log('helloworld1')
    res.json(req.user)
}
exports.addPosts = async (req,res) => {
    
    let image = [];
    if (req.files !== undefined) {
        req.files.map((file, i) => {
            image[i] = 'postPhoto' + file.filename;
        })
    } else {
        image = 'no images!'
    }
    
   const AddPost =new AddPosts( {
       description : req.body.description,
       images : []
   })
   AddPost.images.unshift(image)
   const savedPosts = await AddPost.save();
   res.status(201).json(savedPosts)
// res.send(req.body)
} 