const express = require("express");
const imagesController = require("../controllers/images");
const router = express.Router();
const multer = require("multer");

var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null,  './uploads/images');
  },
  filename: function (req, file, callback) {
    callback(null, Date.now()+'.'+file.originalname);
  }
});
const upload = multer({ storage : storage});

router.post("/delete/(:id)", imagesController.deleteImage);
router.post("/add/", upload.single('ImageLink'), imagesController.addImage);
router.get("/list/", imagesController.listImage);


module.exports = router;