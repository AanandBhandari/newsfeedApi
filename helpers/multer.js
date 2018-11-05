const path= require("path");
const multer= require("multer");

const posts = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads/posts')
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now()+ path.extname(file.originalname)) 
    }
  })
   
  const userPic = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/userProfilePic')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()  + path.extname(file.originalname))
    }
  })
  exports.uploadUserPic= multer({storage: userPic}).single("profilePic");
  exports.uploadImage = multer({ storage: posts }).array('posts')