'use strict';

module.exports = (app, db) => {
    const moment = require('moment');
    app.get('/Manager', (req, res) => {
        db.Manager
            .findAll()
            .then(manager => {
                res.json(manager);
            })
            .catch((error) => {
                res.json({ "error": error });
            });
    });

    app.get('/Manager/:id', (req, res) => {
        const id = req.params.id;
        db.Manager
            .findOne({
                where: { BackerID: id }
            })
            .then(manager => {
                res.json(manager);
            })
            .catch((error) => {
                res.json({ "error": error });
            })
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
        const manager = {
            Name: req.body.Name,
            Account: req.body.Account,
            Password: req.body.Password,
            CreateUser: req.body.CreateUser,
            CreateDate: moment().format('YYYY-MM-DD HH:mm:ss.SSS'),
            ModifyUser: "",
            ModifyDate: ""
        };
        db.Manager
            .create(manager)
            .then((result) => {
                console.log("db Manager create Successfully");
                res.json(result);
            })
            .catch((error) => {
                console.error("db Manager create error happened", error);
            });
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
        const id = req.params.id;
        const updateManager = {
            Name: req.body.Name,
            Account: req.body.Account,
            Password: req.body.Password,
            ModifyUser: req.body.ModifyUser,
            ModifyDate: moment().format('YYYY-MM-DD HH:mm:ss.SSS')
        };
        db.Manager
            .findOne({ where: { BackerID: id } })
            .then((specificManager) => {
                if (specificManager) {
                    specificManager.updateAttributes(updateManager)
                        .then((result) => {
                            console.log("update Manager Successfully");
                            res.json(result);
                        })
                        .catch((error) => {
                            console.error("db Manager update error happened", error);
                        })
                }
                else {
                    console.log("findOne result: Manager data not found");
                    res.json({ "error": "Manager data not found" });
                }
            })
            .catch((error) => {
                console.log("findOne error happended", error);
                res.json({ "error": error });
            });
    });

    app.delete('/Manager/:id', (req, res) => {
        const id = req.params.id;
        db.Manager
            .destroy({
                where: { BackerID: id }
            })
            .then(() => {
                res.json({ "msg": "Delete data sucessfully" });
            })
            .catch((error) => {
                res.json({ "error": error });
            });
    });
};