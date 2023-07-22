import multer from 'multer'
import fs from 'fs'
// image upload
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // make sure directory exists
      if (!fs.existsSync("./uploads")) {
        fs.mkdirSync("./uploads");
      }
      cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
      // remove spaces and special characters from original filename
      var originalname = file.originalname.replace(/[^a-zA-Z0-9]/g, "");
      // set filename to fieldname + current date + original filename
      cb(null, file.fieldname + "_" + Date.now() + "_" + originalname);
    },
  });
  
  var upload = multer({
    storage: storage,
  }).single("image"); 

  export{upload}