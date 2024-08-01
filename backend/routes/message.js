const express = require('express');
const router = express.Router();
const messageRoutes = require('../controllers/messageController');
router.use('/', messageRoutes);
module.exports = router;
