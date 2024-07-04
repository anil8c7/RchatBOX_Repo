const express = require('express');
const router = express.Router();
const userModel = require('../model/userModel');

router.post('/testing', async (req, resp) => {
  return resp.status(200).json('hello there');
});


module.exports = router;   
