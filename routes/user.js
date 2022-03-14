const express = require("express");
const userController = require("../controllers/user");
const router = express.Router();



router.post("/register/", userController.userRegister);
router.post("/login/", userController.userLogin);
router.post("/alluser/", userController.userList);


module.exports = router;