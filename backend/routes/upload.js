const cloudinary = require("cloudinary").v2;
const express = require("express");
const UploadRouter = express.Router();
const multer = require("multer");
// Set up multer for file uploads
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage });
const API_KEY_SECRET = process.env.API_KEY_SECRET;

// Configuration
cloudinary.config({
  cloud_name: "dgxggi8xx",
  api_key: "946199172599922",
  api_secret: `${API_KEY_SECRET}`,
});

async function handleUpload(file) {
  const res = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });
  return res;
}

UploadRouter.post("/", upload.single("item"), async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    // console.log(dataURI)
    const cldRes = await handleUpload(dataURI);
    res.json(cldRes);
    console.log("success",cldRes)
  } catch (error) {
    console.log(error);
    res.send({
      message: error.message,
    });
  }
});

module.exports = UploadRouter;
