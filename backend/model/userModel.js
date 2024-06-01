const { Error } = require('sequelize');
const dbConn = require('../db/dbConnection');
const bcrypt = require('bcrypt');



function checkEmailExist(email) {
    return new Promise((resolve, reject) => {
        const query = `SELECT COUNT(*) AS count FROM admin WHERE email = ?`
        const value = [email];
        dbConn.query(query, value, (error, result) => {
            if (error) {
                reject(error);
            } else {
                const getemail = result[0].count > 0;
                resolve(getemail)
            }
        })
    })
}
// create user function
async function createUser(name, email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return new Promise((resolve, reject) => {
        let query = "";
        let role = "";
        if(email =='anil@gmail.com'){
                query = 'INSERT INTO admin (name, email, password,role,status) VALUES (?, ?, ?,?,?)';
                role = "superadmin";
            }else{
                query = 'INSERT INTO admin (name, email, password,role,status) VALUES (?, ?, ?,?,?)';
                role = "user";
        }
        const values = [name, email, hashedPassword,role,1]
        dbConn.query(query, values, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        })
    })
}
 async function signInUser(email) {
            return new Promise((resolve, reject) => {
                const query = 'SELECT email,password FROM admin WHERE email=? AND status = ?';
                const value = [email,1];
                dbConn.query(query, value, async (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        if (result.length > 0) {
                            resolve(result);
                        } else {
                            reject('User Not found');
                        }
                    }
                });
            });
        } 


module.exports = { createUser, signInUser,checkEmailExist };