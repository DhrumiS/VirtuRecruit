const multer = require("multer");
const path = require("path");
const crypto = require("crypto");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); 
  },
  filename: (req, file, cb) => {
    const randomName = crypto.randomBytes(16).toString("hex"); 
    const extension = path.extname(file.originalname); 
    cb(null, `${randomName}${extension}`);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
