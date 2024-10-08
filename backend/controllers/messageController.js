const express = require('express');
const router = express.Router();
const messageModel = require("../model/messageModel");
router.post("/messageSent", async (req, resp) => {
    const { chatId, senderId, message } = req.body;
    if (chatId != "") {
        try {
            let checkChatId = await messageModel.checkExistChatId(chatId);
            if (checkChatId) {
                const checkUserExist = await messageModel.checkUserExist(senderId);
                if (checkUserExist) {
                    const postData = {
                        chatId: chatId,
                        senderId: senderId,
                        message: message
                    };
                    const result = await messageModel.insertChatData(postData);
                    if (result) {
                        const data = {
                            status: 200,
                            message: "data is inserted"
                        }
                        return resp.status(200).json(data);
                    } else {
                        const data = {
                            status: 400,
                            message: "Data Not Inserted"
                        }
                        return resp.status(400).json(data);
                    }
                } else {
                    const data = {
                        status: 400,
                        message: "sender Id does not exist"
                    }
                    return resp.status(400).json(data);
                }
            } else {
                const data = {
                    status: 404,
                    message: "chatId does not exist"
                }
                return resp.status(404).json(data);
            }
        } catch (error) {
            const data = {
                status: 404,
                message: error.message
            }
        }
    } else {
        const data = {
            status: 404,
            message: "chatId is required"
        }
        return resp.status(404).json(data);
    }
})

router.get("/getMessages/:id", async (req, resp) => {
    const chatId = req.params.id;
    if (chatId) {
        try {
            let checkChatId = await messageModel.checkExistChatId(chatId);
            if (checkChatId) {
                const chatData = await messageModel.getMessages(chatId);
                const data = {
                    status: 200,
                    message: "message found",
                    data: chatData
                }
                return resp.status(200).json(data);
            } else {
                const data = {
                    status: 404,
                    message: "ChatId does not Exist",
                }
                return resp.status(404).json(data);
            }
        } catch (error) {
            const data = {
                status: 500,
                message: error.message,
            }
            return resp.status(500).json(data);
        }
    } else {
        const data = {
            status: 400,
            message: "Chat Id required",
        }
        return resp.status(400).json(data);
    }
})
module.exports = router;