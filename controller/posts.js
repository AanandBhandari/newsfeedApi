const {Post} = require('../models/Post.js');
const {User} = require('../models/User.js')
exports.showPosts = async (req,res) => {
    // console.log('helloworld1')
    // res.json(req.user)
    const showPosts = await Post.find({})
    res.json(showPosts)
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
    
   const AddPost =new Post( {
        user: req.user.id,
       description : req.body.description,
       images : []
   })
   AddPost.images.unshift(image)
   const savedPosts = await AddPost.save();
   res.status(201).json(savedPosts)
// res.send(req.body)
} 
exports.searchFriends = async(req,res) => {
    const query = req.query.name;
    let result = await User.find({name: {'$regex': query, '$options': 'i'}});
    if(!result) throw new Error();
    res.status(200).json(result) 
  
}
exports.friendRequest = async(req,res) => {
    if (req.params.id !== req.user._id) {
        const friend = await User.findById(req.params.id);
        if(friend) {
            const frenreq = {
                user : req.user._id
            }
            friend.friends.push(frenreq);
            const friendrequest = await friend.save();
            res.status(201).json(friendrequest)
            // res.send(user)
        }
    } else {
        res.send('U r the bestest friend of urslf :)')
    }
}
exports.approveRequest = async(req,res) => {

}
exports.allUnapprovedRequest = async(req,res) => {
    const me = await User.findById(req.user._id)
    if (me) {
        let unapprovereqs = [], i, length = me.friends.length;
        for (i = 0; i < length; i++) {
            if (me.friends[i].approveRequest === false) {
                unapprovereqs.push(me.friends[i].user)
            }
            
        }
        res.json(unapprovereqs)
    }
}