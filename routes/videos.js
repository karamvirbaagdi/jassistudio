const express = require("express");
const videoController = require("../controllers/video");
const router = express.Router();
const multer = require("multer");

var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null,  './uploads/videos');
  },
  filename: function (req, file, callback) {
    callback(null, Date.now()+'.'+file.originalname);
  }
});
const upload = multer({ storage : storage});

//router.post("/delete/(:id)", imagesController.deleteImage);
router.post("/add/", upload.single('videoLink'), videoController.addVideo);
router.post("/list/", videoController.listVideo);
router.post("/delete/",  videoController.deleteVideo);
//router.get("/list/", imagesController.listImage);


module.exports = router;