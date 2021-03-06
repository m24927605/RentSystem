'use strict';

module.exports = (app, db) => {
    const moment = require('moment');
    const SQLPayFlow = require('../repository/payFlow')(db);
    const SQLRentDetail = require('../repository/rentDetail')(db);
    const SQLUserDetail = require('../repository/userDetail')(db);
    const errorMessage = require('../services/helpers/error')();
    const payService = require('../services/pay')();

    app.get('/api/PayFlow', (req, res) => {
        try {
            SQLPayFlow.findAll()
                .then((payFlow) => {
                    res.status(200).json(payFlow);
                })
                .catch((error) => {
                    res.status(500).json(errorMessage.moduleSend("sequelize", error));
                })
        } catch (err) {
            res.status(500).json(errorMessage.routerSend("PayFlow", err));
        }
    });

    app.get('/api/PayFlow/:sizePage/:currentPage', (req, res) => {
        try {
            let RoomNo = req.query.RoomNo;
            let UserID = +req.query.UserID;
            let queryObj = {};
            if (RoomNo !== 'undefined') {
                queryObj = { RoomNo: RoomNo };
            }
            if (UserID) {
                queryObj = { UserID: UserID };
            }
            let sizePage = +req.params['sizePage'];
            let currentPage = +req.params['currentPage'];
            SQLPayFlow.findAndCountAll(queryObj, sizePage, currentPage)
                .then(([payFlow, total]) => {
                    let resObj = {
                        size: sizePage,
                        current: currentPage,
                        total: total,
                        data: payFlow
                    }
                    res.status(200).json(resObj);
                })
                .catch((error) => {
                    res.status(500).json(errorMessage.moduleSend("sequelize", error));
                })
        } catch (err) {
            res.status(500).json(errorMessage.routerSend("PayFlow", err));
        }
    });

    app.get('/api/PayFlow/NoPage', (req, res) => {
        try {
            let UserID = +req.query.UserID;
            let queryObj = {};

            if (UserID) {
                queryObj = { UserID: UserID };
            }
            SQLPayFlow.findAllWhere(queryObj)
                .then((payFlow) => {
                    res.status(200).json(payFlow);
                })
                .catch((error) => {
                    res.status(500).json(errorMessage.moduleSend("sequelize", error));
                })
        } catch (err) {
            res.status(500).json(errorMessage.routerSend("PayFlow", err));
        }
    });

    app.get('/api/PayFlow/:id', (req, res) => {
        try {
            let id = req.params.id;
            let queryObj = { ID: id };
            SQLPayFlow.findOne(queryObj)
                .then((payFlow) => {
                    res.status(200).json(payFlow);
                })
                .catch((error) => {
                    res.status(500).json(errorMessage.moduleSend("sequelize", error));
                })
        } catch (err) {
            res.status(500).json(errorMessage.routerSend("PayFlow", err));
        }
    });

    app.post('/api/PayFlow', async (req, res) => {
        try {
            let UserID = req.body.UserID;
            let RoomNo = req.body.RoomNo;
            let TimeOfPayment = req.body.TimeOfPayment;
            let RentPeriod = req.body.RentPeriod;
            let CalculateType = req.body.CalculateType;
            let PowerQty = req.body.PowerQty;
            let userDetail = await SQLUserDetail.findOne({ UserID: UserID });
            let RentMonthly = userDetail.RentDetail.dataValues.RentMonthly;
            let TVCost = userDetail.dataValues.TVCost;
            let payFlowArray = await SQLPayFlow.findAllWhere({ UserID: UserID });
            let payFlowCount = payFlowArray.length;
            let pastPowerQty;
            if (payFlowCount === 0) {
                pastPowerQty = PowerQty;
            }
            else {
                pastPowerQty = payFlowArray[payFlowCount - 1].dataValues.PowerQty;
            }
            let usedPowerQty = PowerQty - pastPowerQty;
            let payment = await payService.calculatePay(CalculateType, usedPowerQty, RentMonthly, TVCost)
            let newPayFlow = {
                UserID: UserID,
                RoomNo: RoomNo,
                PowerQty: parseFloat(PowerQty),
                UsedPowerQty: parseFloat(usedPowerQty),
                Payment: payment,
                TimeOfPayment: null,
                RentPeriod: moment(RentPeriod).toDate(),
                CreateUser: req.body.CreateUser,
                CreateDate: moment().toDate(),
                ModifyUser: "",
                ModifyDate: null
            };
            SQLPayFlow.createOne(newPayFlow)
                .then((payFlow) => {
                    res.status(200).json(payFlow);
                })
                .catch((error) => {
                    res.status(500).json(errorMessage.moduleSend("sequelize", error));
                })
        } catch (err) {
            res.status(500).json(errorMessage.routerSend("PayFlow", err));
        }
    });

    app.patch('/api/PayFlow/:id', (req, res) => {
        try {
            let id = req.params.id;
            let UserID = req.body.UserID;
            let RoomNo = req.body.RoomNo;
            let TimeOfPayment = req.body.TimeOfPayment;
            let RentPeriod = req.body.RentPeriod;
            let updatePayFlow = {
                UserID: UserID,
                RoomNo: RoomNo,
                PowerQty: parseFloat(req.body.PowerQty),
                Payment: parseFloat(req.body.Payment),
                TimeOfPayment: moment(TimeOfPayment).toDate(),
                RentPeriod: moment(RentPeriod).toDate(),
                ModifyUser: req.body.ModifyUser,
                ModifyDate: moment().toDate()
            };
            let queryObj = { ID: id };
            SQLPayFlow.updateOne(queryObj, updatePayFlow)
                .then((payFlow) => {
                    res.status(200).json(payFlow);
                })
                .catch((error) => {
                    res.status(500).json(errorMessage.moduleSend("sequelize", error));
                })
        } catch (err) {
            res.status(500).json(errorMessage.routerSend("PayFlow", err));
        }
    });

    app.patch('/api/PayFlow/pay/:id', (req, res) => {
        try {
            let id = req.params.id;
            let updatePayFlow = {
                TimeOfPayment: moment().toDate(),
                ModifyUser: req.body.ModifyUser,
                ModifyDate: moment().toDate()
            };
            let queryObj = { ID: id };
            SQLPayFlow.updateOne(queryObj, updatePayFlow)
                .then((payFlow) => {
                    res.status(200).json(payFlow);
                })
                .catch((error) => {
                    res.status(500).json(errorMessage.moduleSend("sequelize", error));
                })
        } catch (err) {
            res.status(500).json(errorMessage.routerSend("PayFlow", err));
        }
    });

    app.delete('/api/PayFlow/:id', (req, res) => {
        try {
            let id = req.params.id;
            let queryObj = { ID: id };

            SQLPayFlow.deleteOne(queryObj)
                .then((result) => {
                    res.status(500).json(errorMessage.moduleSend("sequelize", error));
                })
                .catch((error) => {
                    res.status(500).json(errorMessage.moduleSend("sequelize", error));
                })
        } catch (err) {
            res.status(500).json(errorMessage.routerSend("PayFlow", err));
        }
    });
};