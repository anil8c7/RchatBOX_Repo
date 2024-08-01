const express = require('express');
const router = express.Router();
const chatRoutes = require('../controllers/chatController');
router.use('/', chatRoutes);
module.exports = router;
