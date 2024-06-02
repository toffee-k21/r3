const express = require("express");
const path = require("path")
const UploadRouter = express.Router();
const multer = require("multer");
// const upload = multer({ dest: "./uploads" });


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + file.originalname;
    cb(null, uniqueSuffix);
  }
});
const upload = multer({ storage: storage });

UploadRouter.post("/", upload.single("file"), (req, res) => {
  console.log(req.file);
  // console.log(req.file.mimetype.split("/").at(-1));
  res.status(200).json({result: "done"});
});


module.exports = UploadRouter;
