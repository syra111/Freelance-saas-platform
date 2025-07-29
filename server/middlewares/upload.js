const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadPath = path.join(__dirname, "../uploads/tasks");
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadPath),
  filename: (req, file, cb) => {
    const unique = `${Date.now()}-${file.originalname}`;
    cb(null, unique);
  }
});

const upload = multer({ storage });
module.exports = upload;
