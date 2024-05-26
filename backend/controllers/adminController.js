const express = require('express')
const router = express.Router();
const userModel = require('../model/userModel');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const Authentication = require('../services/auth');




router.post('/signup', async (req, resp) => {
    const { name, email, password } = req.body;
    const data = {
        status: 400,
        message: ''
    };
    try {
        if (name !== "" && email !== "" && password !== "") {
            let isEmailValid = await checkEmailValidation(email)
            if (isEmailValid) {
                const newEmailExist = await userModel.checkEmailExist(email);
                if (newEmailExist) {
                    const data = {
                        status: 409,
                        message: 'User is already exist'
                    };
                    return resp.status(409).json(data);
                } else {
                    const newUser = await userModel.createUser(name, email, password);
                    const data = {
                        status: 201,
                        message: 'User Created'
                    };
                    return resp.status(201).json(data);
                }

            } else {
                const data = {
                    status: 400,
                    message: "Email is not Valid"
                }
                return resp.status(400).json(data);
            }
        }
        else {
            const data = {
                status: 400,
                message: "All fields are required"
            }
            return resp.status(400).json(data);
        }
    }
    catch (error) {
        const data = {
            status: 500,
            message: error.message 
        };
        return resp.status(500).json(data);
    }
})

function checkEmailValidation(email) {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(email)) {
        return false;
    }
    return true
}
router.post('/signin', async (req, resp) => {
    const { email, password } = req.body;
    try {
        if (email != "" && password != "") {
            const user = await userModel.signInUser(email);
            if (user.length > 0) {
                const dbpassword = user[0].password;
                const passwordMatch = await bcrypt.compare(password, dbpassword);
                if (passwordMatch) {
                    // let sesssionId = uuidv4();
                    // const author = new Authentication;
                    const data = {
                        status: 201,
                        message: "User Login Successfully"
                    };
                    return resp.status(201).json(data);
                } else {
                    const data = {
                        status: 201,
                        message: "Password is not Matched"
                    };
                    return resp.status(409).json(data);
                }

            } else {
                const data = {
                    status: 201,
                    message: "USER not exist in database"
                };
                return resp.status(409).json(data);
            }
        }else{
            const data = {
                status: 400,
                message: "All fields are required"
            }
            return resp.status(400).json(data);
        }
    } catch (error) {
 const data = {
            status: 500,
            message: error.message 
        };
        return resp.status(500).json(data);
    }
})

module.exports = router; 