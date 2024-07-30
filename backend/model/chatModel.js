const dbConn = require('../db/dbConnection');

function checkUserExist(id) {
    return new Promise((resolve, reject) => {
        const query = "SELECT id from admin where id = ?"
        const value = [id];
        dbConn.query(query, value, (error, result) => {
            if (error) {
                reject(error);
            } else {
                if(result.length>0) resolve(result);
            }
        })

    })
}

function createOrGetchat(userId, friendId) {
    return new Promise((resolve, reject) => {
        const query = "SELECT id FROM chats WHERE (userId = ? AND friendId) OR (userId = ? AND friendId=?)";
        const value = [userId, friendId, friendId, userId];
        dbConn.query(query, value, (error, result) => {
            if (error) {
                reject(error);
            } 
            if(result.length>0){
                resolve(result[0].id);
            }else {
                const insertQuery = "Insert into chats(userId,friendId) VALUES (?,?)"
                const insertValue = [userId, friendId];
                dbConn.query(insertQuery, insertValue, (error, result) => {
                    if(error){
                        reject(error);
                    }else{
                        resolve(result);
                    }
                });
            }
        })

    })
}
function getUserChats(userId){
    return new Promise((resolve, reject) => {
        const query = "SELECT * from chats WHERE userId = ?";
        const value = [userId];
        dbConn.query(query,value,(error,result)=>{

        })
    })
}
module.exports = { checkUserExist, createOrGetchat,getUserChats }