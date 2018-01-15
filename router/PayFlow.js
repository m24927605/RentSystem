'use strict';

module.exports = (app, db) => {
    const moment = require('moment');
    const SQLPayFlow = require('../repository/PayFlow')(db);
    let errorMessage = require('../services/helpers/error')();
    app.get('/PayFlow', (req, res) => {
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

    app.get('/PayFlow/:sizePage/:currentPage', (req, res) => {
        try {
            let queryObj = {};
            let sizePage = +req.params['sizePage'];
            let currnetPage = +req.params['currentPage'];
            SQLPayFlow.findAndCountAll(queryObj, sizePage, currnetPage)
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

    app.get('/PayFlow/:id', (req, res) => {
        try {
            const id = req.params.id;
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
    /**
     * @description 測試資料
     * @example {
                "UserID": 4,
                "PowerQty": 400,
                "Payment": 10000,
                "CreateUser": "System"
    }
     */
    app.post('/PayFlow', (req, res) => {
        try {
            const newPayFlow = {
                UserID: req.body.UserID,
                RoomNo: req.body.RoomNo,
                PowerQty: parseFloat(req.body.PowerQty),
                Payment: parseFloat(req.body.Payment),
                TimeOfPayment: moment().format('YYYY-MM-DD HH:mm:ss.SSS'),
                CreateUser: req.body.CreateUser,
                CreateDate: moment().format('YYYY-MM-DD HH:mm:ss.SSS'),
                ModifyUser: "",
                ModifyDate: ""
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
    /**
     * @description 測試資料
     * @example {
                "UserID": 4,
                "PowerQty": 200,
                "Payment": 8000,
                "CreateUser": "System",
                "ModifyUser": "System"
    }
     */
    app.patch('/PayFlow/:id', (req, res) => {
        try {
            const id = req.params.id;
            const updatePayFlow = {
                UserID: req.body.UserID,
                RoomNo: req.body.RoomNo,
                PowerQty: parseFloat(req.body.PowerQty),
                Payment: parseFloat(req.body.Payment),
                TimeOfPayment: moment().format('YYYY-MM-DD HH:mm:ss.SSS'),
                ModifyUser: req.body.ModifyUser,
                ModifyDate: moment().format('YYYY-MM-DD HH:mm:ss.SSS')
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

    app.delete('/PayFlow/:id', (req, res) => {
        try {
            const id = req.params.id;
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