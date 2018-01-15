'use strict';

module.exports = (app, db) => {
    const moment = require('moment');
    const SQLManager = require('../repository/Manager')(db);
    let errorMessage = require('../services/helpers/error')();
    app.get('/Manager', (req, res) => {
        try {
            SQLManager.findAll()
                .then((manager) => {
                    res.status(200).json(manager);
                })
                .catch((error) => {
                    res.status(500).json(errorMessage.moduleSend("sequelize", error));
                })
        } catch (err) {
            res.status(500).json(errorMessage.routerSend("Manager", err));
        }
    });

    app.get('/Manager/:id', (req, res) => {
        try {
            const id = req.params.id;
            let queryObj = { BackerID: id };
            SQLManager.findOne(queryObj)
                .then((manager) => {
                    res.status(200).json(manager);
                })
                .catch((error) => {
                    res.status(500).json(errorMessage.moduleSend("sequelize", error));
                })
        } catch (err) {
            res.status(500).json(errorMessage.routerSend("Manager", err));
        }
    });
    /**
     * @description 測試資料
     * @example {
                "Name": "Test",
                "Account": "Test",
                "Password": "test",
                "CreateUser": "System"
            }
     */
    app.post('/Manager', (req, res) => {
        try {
            const newManager = {
                Name: req.body.Name,
                Account: req.body.Account,
                Password: req.body.Password,
                CreateUser: req.body.CreateUser,
                CreateDate: moment().format('YYYY-MM-DD HH:mm:ss.SSS'),
                ModifyUser: "",
                ModifyDate: ""
            };
            SQLManager.createOne(newManager)
                .then((manager) => {
                    res.status(200).json(manager);
                })
                .catch((error) => {
                    res.status(500).json(errorMessage.moduleSend("sequelize", error));
                })
        } catch (err) {
            res.status(500).json(errorMessage.routerSend("Manager", err));
        }
    });
    /**
     * @description 測試資料
     * @example  {
                "Name": "Test123",
                "Account": "Test123",
                "Password": "test123",
                "ModifyUser": "System"
            }
     */
    app.patch('/Manager/:id', (req, res) => {
        try {
            const id = req.params.id;
            let queryObj = { BackerID: id };
            const updateManager = {
                Name: req.body.Name,
                Account: req.body.Account,
                Password: req.body.Password,
                ModifyUser: req.body.ModifyUser,
                ModifyDate: moment().format('YYYY-MM-DD HH:mm:ss.SSS')
            };
            SQLManager.updateOne(queryObj, updateManager)
                .then((manager) => {
                    res.status(200).json(manager);
                })
                .catch((error) => {
                    res.status(500).json(errorMessage.moduleSend("sequelize", error));
                })
        } catch (err) {
            res.status(500).json(errorMessage.routerSend("Manager", err));
        }
    });

    app.delete('/Manager/:id', (req, res) => {
        try {
            const id = req.params.id;
            let queryObj = { BackerID: id };
            SQLManager.deleteOne(queryObj)
                .then((result) => {
                    res.status(200).json(result);
                })
                .catch((error) => {
                    res.status(500).json(errorMessage.moduleSend("sequelize", error));
                })
        } catch (err) {
            res.status(500).json(errorMessage.routerSend("Manager", err));
        }
    });
};