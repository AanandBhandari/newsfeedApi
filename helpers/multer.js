const path= require("path");
const multer= require("multer");

const posts = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads/posts')
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now()) + path.extname(file.originalname)
    }
  })
   
  exports.uploadImage = multer({ storage: posts }).array('posts')