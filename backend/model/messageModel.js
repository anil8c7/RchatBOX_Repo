const { post } = require('../controllers/messageController');
const dbConn = require('../db/dbConnection');

function checkUserExist(id) {
    return new Promise((resolve, reject) => {
        const query = "SELECT id FROM admin WHERE id = ?";
        const values = [id];

        dbConn.query(query, values, (error, results) => {
            if (error) {
                return reject(new Error(`Database query error: ${error.message}`));
            }
            if (results.length > 0) {
                return resolve(true);
            } else {
                return resolve(false);
            }
        });
    });
}

function checkExistChatId(chatId) {
    return new Promise((resolve, reject) => {
        const query = "SELECT id FROM chats WHERE id = ?";
        const value = [chatId];
        dbConn.query(query, value, (error, result) => {
            if (error) {
                return reject(new Error(`Database query error: ${error.message}`));
            }
            if (result.length > 0) {
                return resolve(true);
            } else {
                return resolve(false);
            }
        });
    });
}
function insertChatData(postData) {
    return new Promise((resolve, reject) => {
        const query = "INSERT INTO messages (chatId, senderId, message) VALUES (?, ?, ?)";
        const values = [postData.chatId, postData.senderId, postData.message]; 
        dbConn.query(query, values, (error, results) => {
            if (error) {
                return reject(new Error(`Database query error: ${error.message}`));
            }
            resolve(results); // Resolve with results on success
        });
    });
}

function getMessages(chatId){
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM messages WHERE chatId = ?";
        const values = [chatId];

        dbConn.query(query, values, (error, results) => {
            if (error) {
                return reject(new Error(`Database query error: ${error.message}`));
            }
            if (results.length > 0) {
                return resolve(results);
            } 
        });
    });
}
module.exports = {checkExistChatId,getMessages,insertChatData,checkUserExist};