const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `${__dirname}/../uploads`)
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      var ext = file.mimetype.split("/")[1];
      var temp;

      if(ext === 'png' || ext === 'jpeg'  || ext === 'jpg'){
          temp = file.fieldname + '-' + uniqueSuffix + "." +ext;
        cb(null, temp)
      }
      else{
        temp = file.fieldname + '-' + uniqueSuffix;
        cb(null, temp)
      }
    }
  })
const upload = multer({ storage: storage });
const uploadedImg = upload.single('profileImg');

module.exports = { uploadedImg };