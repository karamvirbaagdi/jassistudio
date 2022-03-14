const express = require('express');
const imagesRoutes = require('./images');
const userRoutes = require('./user');
const videoRoutes = require('./videos');
const router = express.Router();

router.use('/image', imagesRoutes);
router.use('/user', userRoutes);
router.use('/video', videoRoutes);

module.exports = router;