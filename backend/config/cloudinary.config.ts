import {v2 as cloudinary} from 'cloudinary'
const { CloudinaryStorage } = require('multer-storage-cloudinary');

export const storage = new CloudinaryStorage({
  cloudinary,
  allowedFormats: ['jpg', 'png'],
  filename: function (req, file, cb) {
    cb(null, file.originalname); 
  }
});
