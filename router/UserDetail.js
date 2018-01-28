'use strict';

module.exports = (app, db) => {
    const moment = require('moment');
    const SQLUserDetail = require('../repository/UserDetail')(db);
    const errorMessage = require('../services/helpers/error')();

    app.get('/api/UserDetail', (req, res) => {
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

    app.get('/api/UserDetail/:sizePage/:currentPage', (req, res) => {
        try {
            let UserName = req.query.UserName;
            let queryObj = {};
            if (UserName) {
                queryObj = { UserName: UserName };
            }
            let sizePage = +req.params['sizePage'];
            let currentPage = +req.params['currentPage'];
            SQLUserDetail.findAndCountAll(queryObj, sizePage, currentPage)
                .then(([userDetail, total]) => {
                    let resObj = {
                        size: sizePage,
                        current: currentPage,
                        total: total,
                        data: userDetail
                    }
                    res.status(200).json(resObj);
                })
                .catch((error) => {
                    res.status(500).json(errorMessage.moduleSend("sequelize", error));
                })
        } catch (err) {
            res.status(500).json(errorMessage.routerSend("UserDetail", err));
        }
    });

    app.get('/api/UserDetail/:id', (req, res) => {
        try {
            let id = req.params.id;
            let queryObj = { UserID: id, Status: 1 };
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

    app.post('/api/UserDetail', (req, res) => {
        try {
            let Birth = req.body.Birth;
            if (req.body.Birth) {
                Birth = moment(req.body.Birth).toDate()
            }
            let newUser = {
                RoomID: req.body.RoomID,
                UserName: req.body.UserName,
                Birth: Birth,
                Sex: req.body.Sex,
                IDCardNo: req.body.IDCardNo,
                Phone: req.body.Phone,
                ContactUser: req.body.ContactUser,
                ContactUserPhone: req.body.ContactUserPhone,
                Career: req.body.Career,
                Address: req.body.Address,
                LineID: req.body.LineID,
                CalculateType: req.body.CalculateType,
                TVCost: req.body.TVCost,
                CreateUser: req.body.CreateUser,
                CreateDate: moment().toDate(),
                ModifyUser: "",
                ModifyDate: null,
                Status: 1
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

    app.patch('/api/UserDetail/:id', (req, res) => {
        try {
            let id = req.params.id;
            let Birth = req.body.Birth;
            let updateUser = {
                RoomID: req.body.RoomID,
                UserName: req.body.UserName,
                Birth: moment(Birth).toDate(),
                Sex: req.body.Sex,
                IDCardNo: req.body.IDCardNo,
                Phone: req.body.Phone,
                ContactUser: req.body.ContactUser,
                ContactUserPhone: req.body.ContactUserPhone,
                Career: req.body.Career,
                Address: req.body.Address,
                LineID: req.body.LineID,
                TVCost: req.body.TVCost,
                CalculateType: req.body.CalculateType,
                ModifyUser: req.body.ModifyUser,
                ModifyDate: moment().toDate(),
                Status: req.body.Status
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

    app.delete('/api/UserDetail/:id', (req, res) => {
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