'use strict';

module.exports = (app, db) => {
    const moment = require('moment');
    const SQLUserDetail = require('../repository/UserDetail')(db);
    let errorMessage = require('../services/helpers/error')();
    app.get('/UserDetail', (req, res) => {
        try {
            SQLUserDetail.findAll()
                .then((userDetail) => {
                    res.status(200).json(userDetail);
                })
                .catch((error) => {
                    res.status(500).json(errorMessage.moduleSend("sequelize", error));
                })
        } catch (err) {
            res.status(500).json(errorMessage.routerSend("UserDetail", err));
        }
    });
    app.get('/UserDetail/:sizePage/:currentPage', (req, res) => {
        try {
            let queryObj = {};
            let sizePage = +req.params['sizePage'];
            let currnetPage = +req.params['currentPage'];
            SQLUserDetail.findAndCountAll(queryObj, sizePage, currnetPage)
                .then((userDetail) => {
                    res.status(200).json(userDetail);
                })
                .catch((error) => {
                    res.status(500).json(errorMessage.moduleSend("sequelize", error));
                })
        } catch (err) {
            res.status(500).json(errorMessage.routerSend("UserDetail", err));
        }
    });

    app.get('/UserDetail/:id', (req, res) => {
        try {
            const id = req.params.id;
            let queryObj = { UserID: id };
            SQLUserDetail.findOne(queryObj)
                .then((userDetail) => {
                    res.status(200).json(userDetail);
                })
                .catch((error) => {
                    res.status(500).json(errorMessage.moduleSend("sequelize", error));
                })
        } catch (err) {
            res.status(500).json(errorMessage.routerSend("UserDetail", err));
        }
    });
    /**
     * @description 測試資料
     * @example {
        "RoomID": "1",
        "UserName": "TEST",
        "Birth": "1992-04-26",
        "IDCardNo": "L124799531",
        "Phone": "0910723969",
        "ContacterPhone": "5566",
        "Career": "IT",
        "Address": "新北市忠和區景新街389號",
        "Email": "m24927605@gmail.com",
        "LineID": "dali17dali17"
    }
     */
    app.post('/UserDetail', (req, res) => {
        try {
            const Birth = req.body.Birth;
            const newUser = {
                RoomID: req.body.RoomID,
                UserName: req.body.UserName,
                Birth: moment(Birth).format('YYYY-MM-DD'),
                IDCardNo: req.body.IDCardNo,
                Phone: req.body.Phone,
                ContacterPhone: req.body.ContacterPhone,
                Career: req.body.Career,
                Address: req.body.Address,
                Email: req.body.Email,
                LineID: req.body.LineID,
                CreateUser: req.body.CreateUser,
                CreateDate: moment().format('YYYY-MM-DD HH:mm:ss.SSS'),
                ModifyUser: "",
                ModifyDate: ""
            };

            SQLUserDetail.createOne(newUser)
                .then((userDetail) => {
                    res.status(200).json(userDetail);
                })
                .catch((error) => {
                    res.status(500).json(errorMessage.moduleSend("sequelize", error));
                })
        } catch (err) {
            res.status(500).json(errorMessage.routerSend("UserDetail", err));
        }
    });

    /**
     * @example{
        "RoomID": "1",
        "UserName": "Ted",
        "Birth": "1992-04-26",
        "IDCardNo": "L124799531",
        "Phone": "0910723969",
        "ContacterPhone": "123456",
        "Career": "IT",
        "Address": "新北市忠和區景新街389號",
        "Email": "m24927605@gmail.com",
        "LineID": "dali17dali17",
        "ModifyUser": "System"
    }
     */
    app.patch('/UserDetail/:id', (req, res) => {
        try {
            const id = req.params.id;
            const Birth = req.body.Birth;
            const updateUser = {
                RoomID: req.body.RoomID,
                UserName: req.body.UserName,
                Birth: moment(Birth).format('YYYY-MM-DD'),
                IDCardNo: req.body.IDCardNo,
                Phone: req.body.Phone,
                ContacterPhone: req.body.ContacterPhone,
                Career: req.body.Career,
                Address: req.body.Address,
                Email: req.body.Email,
                LineID: req.body.LineID,
                ModifyUser: req.body.ModifyUser,
                ModifyDate: moment().format('YYYY-MM-DD HH:mm:ss.SSS')
            };
            let queryObj = { UserID: id };
            SQLUserDetail.updateOne(queryObj, updateUser)
                .then((userDetail) => {
                    res.status(200).json(userDetail);
                })
                .catch((error) => {
                    res.status(500).json(errorMessage.moduleSend("sequelize", error));
                })
        } catch (err) {
            res.status(500).json(errorMessage.routerSend("UserDetail", err));
        }
    });

    app.delete('/UserDetail/:id', (req, res) => {
        try {
            let queryObj = { UserID: id };
            SQLUserDetail.deleteOne(queryObj)
                .then((result) => {
                    res.status(200).json(result);
                })
                .catch((error) => {
                    res.status(500).json(errorMessage.moduleSend("sequelize", error));
                })
        } catch (err) {
            res.status(500).json(errorMessage.routerSend("UserDetail", err));
        }
    });
};