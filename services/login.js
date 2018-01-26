'use strict';
const db = require('../models/index');
const SQLManager = require('../repository/Manager')(db);

module.exports = (db) => {
    const md5 = require('md5');
    const jwt = require('jsonwebtoken');
    const tokenConfig = require('../config/token.config.json');

    return {
        authenticate: (Account, Password) => {
            return new Promise((resolve, reject) => {
                let resObj = {};
                //要比對的密碼
                let md5Pwd = md5(Password);
                let queryObj={Account:Account};
                SQLManager.findOne(queryObj)
                    .then((user) => {
                        if (!user) {
                            resObj.title = 'AuthResult';
                            resObj.result = false;
                            resObj.message = 'Wrong Account';
                            reject(resObj);
                        }
                        //來自資料表的密碼
                        let userPwd = user.Password;
                        if (user && md5Pwd === userPwd) {
                            resObj.title = 'AuthResult';
                            resObj.result = true;
                            resObj.message = 'Correct Password';
                            resObj.role = user.Role;
                            resolve(resObj);
                        }
                        else {
                            resObj.title = 'AuthResult';
                            resObj.result = false;
                            resObj.message = 'Wrong Password';
                            reject(resObj);
                        }
                    })
                    .catch((err) => {
                        reject(err);
                    })
            })
        },
        setToken: (Account, Role) => {
            const payload = { "Account": Account, "Role": Role };
            const token = jwt.sign(payload, tokenConfig.secret, {
                expiresIn: tokenConfig.expiresIn
            });
            return token;
        },
        verifyToken: (token) => {
            if (token) {
                const decode = jwt.verify(token, tokenConfig.secret);
                return decode;
            }
            else {
                return false;
            }
        }
    }
}