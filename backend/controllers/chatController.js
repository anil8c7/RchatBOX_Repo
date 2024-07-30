const express = require('express');
const chatModel = require('../model/chatModel');
const router = express.Router();

router.post('/createChat', async (req, resp) => {
    const { userId, friendId, message } = req.body;
    try {
        if (userId != "" && friendId != "") {
            const checkUserExist = await chatModel.checkUserExist(userId);
            if (checkUserExist) {
                const checkfriendExist = await chatModel.checkUserExist(friendId);
                if (checkfriendExist) {
                    const chatResult = await chatModel.createOrGetchat(userId, friendId);
                } else {
                    const data = {
                        status: 400,
                        message: "User's friend not exist"
                    }
                    return resp.status(400).json(data);
                }
            } else {
                const data = {
                    status: 500,
                    message: "User is not Found"
                };
                return resp.status(400).json(data);
            }
        }
    } catch (error) {
        const data = {
            status: 500,
            message: error
        }
        return resp.status(500).json(data);
    }
})
router.post('/getUserchats/:id', async (req, resp) => {
    const { userId } = req.body;
    try {
        const checkUserExist = await chatModel.checkUserExist(userId);
        if (checkUserExist) {
            const getUserChats = await chatModel.getUserChats(userId);
        } else {
            const data = {
                status: 404,
                message: "UserId does not Exist"
            }
            return resp.status(404).json(data);
        }
    } catch (error) {
        const data = {
            status: 500,
            message: error
        }
        return resp.status(500).json(data);
    }
})
router.post('/findChat/:userId/:friendId', async (req, resp) => {
    const { userId } = req.body;
    try {
        const checkUserExist = await chatModel.checkUserExist(userId);
        if (checkUserExist) {
        } else {
            const data = {
                status: 404,
                message: "UserId does not Exist"
            }
            return resp.status(404).json(data);
        }
    } catch (error) {
        const data = {
            status: 500,
            message: error
        }
        return resp.status(500).json(data);
    }
})

module.exports = router;