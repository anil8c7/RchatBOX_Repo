const express = require('express');
const router = express.Router();
const userModel = require('../model/userModel');

router.post('/signup', async (req, resp) => {
    const { name, email, password } = req.body;
    try {
        if (name != "" && email != "" && password != "") {
            const checkEmailValidation = checkEmailValidation(email);
            if (checkEmailValidation) {
                const checkEmailExist = await userModel.checkEmailExist;
                if (checkEmailExist) {
                    const data = {
                        status: 400,
                        msg: "Email is already Exist in database"
                    }
                    return resp.status(400).json(data);
                } else {
                    let createUser = await userModel.createUser(name, email, password, 'user');
                    if (createUser) {
                        const data = {
                            status: 200,
                            msg: "User is created successfully"
                        }
                        return resp.status(200).json(data);
                    } else {
                        const data = {
                            status: 400,
                            msg: "Something Went wrong"
                        }
                        return resp.status(400).json(data);
                    }
                }
            } else {
                const data = {
                    status: 400,
                    msg: "email is not valid"
                }
                return resp.status(400).json(data);
            }
        } else {
            const data = {
                status: 400,
                msg: "All fields are required"
            }
            return resp.status(400).json(data);
        }
    } catch (error) {
        throw error;
    }
});
router.post('/signin', async (req, resp) => {
});

function checkEmailValidation(email) {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(email)) {
        return false;
    }
    return true
}

module.exports = router;   
