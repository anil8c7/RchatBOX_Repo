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


function createOrGetchat(userId, friendId) {
    return new Promise((resolve, reject) => {
        const query = "SELECT id FROM chats WHERE (userId = ? AND friendId = ?) OR (userId = ? AND friendId = ?)";
        const values = [userId, friendId, friendId, userId];
        dbConn.query(query, values, (error, results) => {
            if (error) {
                reject(new Error(`Database query error: ${error.message}`));
            }

            if (results.length > 0) {
                resolve(results[0].id);
            } else {
                const insertQuery = "INSERT INTO chats (userId, friendId) VALUES (?, ?)";
                const insertValues = [userId, friendId];

                dbConn.query(insertQuery, insertValues, (error, result) => {
                    if (error) {
                        reject(new Error(`Database insert error: ${error.message}`));
                    }
                    resolve(result.insertId);
                });
            }
        });
    });
}

function getUserChats(userId) {
    return new Promise((resolve, reject) => {
        const query = "SELECT * from chats WHERE userId = ?";
        const value = [userId];
        dbConn.query(query, value, (error, result) => {

        })
    })
}
module.exports = { checkUserExist, createOrGetchat, getUserChats }