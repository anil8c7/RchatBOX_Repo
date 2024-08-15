const express = require('express')
const router = express.Router();
const chatModel = require('../model/chatModel');

router.post('/createChat', async (req, resp) => {
    const { userId, friendId } = req.body;
    try {
        if (userId != "" && friendId != "") {
            const checkUserExist = await chatModel.checkUserExist(userId);
            if (checkUserExist) {
                const checkfriendExist = await chatModel.checkUserExist(friendId);
                if (checkfriendExist) {
                    const chatResult = await chatModel.createOrGetchat(userId, friendId);
                    if (chatResult) {
                        const data = {
                            status: 201,
                            message: "chat is found",
                            chatId: chatResult
                        }
                        return resp.status(201).json(data);
                    }
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
router.get('/getUserchats/:id', async (req, resp) => {
    const userId = req.params.id;
    try {
        const checkUserExist = await chatModel.checkUserExist(userId);
        if (checkUserExist) {
            const getUserChats = await chatModel.getUserChats(userId);
            if (getUserChats) {
                const data = {
                    status: 200,
                    message: "Data Found",
                    data: getUserChats
                }
                return resp.status(200).json(data);
            } else {
                const data = {
                    status: 404,
                    message: "User have not chat yet"
                }
                return resp.status(404).json(data);
            }
        } else {
            const data = {
                status: 404,
                message: "UserId does not found"
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
router.get('/findChat/:userId/:friendId', async (req, resp) => {
    const { userId, friendId } = req.params;
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
                        message: "User's friend not found"
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

router.get('/getUsersOnSearch/:query', async (req, resp) => {
    const {query} =  req.params;
    if(query!=""){
        const response =  await chatModel.searchUser(query);
        if(response){
            const data = {
                status:200,
                message:"User found",
                data:response
            };
            return resp.status(200).json(data);
        }else{
            const data = {
                status:404,
                message:"User not exist"
            }
            return resp.status(404).json(data);
        }
    }else{
        const data = {
            status :400,
            message:"query is required"
        } 
        return resp.status(400).json(data);
    }
})
module.exports = router;