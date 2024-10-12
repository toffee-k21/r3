const cloudinary = require("cloudinary").v2;
require('dotenv').config();

const API_KEY_SECRET = process.env.API_KEY_SECRET;

// Configuration
cloudinary.config({
  cloud_name: "dgxggi8xx",
  api_key: "946199172599922",
  api_secret: { API_KEY_SECRET },
});
