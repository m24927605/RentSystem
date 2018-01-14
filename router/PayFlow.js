'use strict';

module.exports = (app, db) => {
    const moment = require('moment');
    app.get('/PayFlow', (req, res) => {
        db.PayFlow
            .findAll({
                include: [
                    {
                        model: db.UserDetail,
                        include:[
                            {
                                model:db.RentDetail
                            }
                        ]
                    }
                ]
            })
            .then(payFlow => {
                res.json(payFlow);
            })
            .catch((error) => {
                res.json({ "error": error });
            });
    });

    app.get('/PayFlow/:id', (req, res) => {
        const id = req.params.id;
        db.PayFlow
            .findOne({
                where: { ID: id }
            })
            .then(payFlow => {
                res.json(payFlow);
            })
            .catch((error) => {
                res.json({ "error": error });
            })
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
        const payDetail = {
            UserID: req.body.UserID,
            RoomNo:req.body.RoomNo,
            PowerQty: parseFloat(req.body.PowerQty),
            Payment: parseFloat(req.body.Payment),
            TimeOfPayment: moment().format('YYYY-MM-DD HH:mm:ss.SSS'),
            CreateUser: req.body.CreateUser,
            CreateDate: moment().format('YYYY-MM-DD HH:mm:ss.SSS'),
            ModifyUser: "",
            ModifyDate: ""
        };
        db.PayFlow
            .create(payDetail)
            .then((result) => {
                console.log("db PayFlow create Successfully");
                res.json(result);
            })
            .catch((error) => {
                console.error("db PayFlow create error happened", error);
            });
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
        const id = req.params.id;
        const updatePay = {
            UserID: req.body.UserID,
            RoomNo:req.body.RoomNo,
            PowerQty: parseFloat(req.body.PowerQty),
            Payment: parseFloat(req.body.Payment),
            TimeOfPayment: moment().format('YYYY-MM-DD HH:mm:ss.SSS'),
            ModifyUser: req.body.ModifyUser,
            ModifyDate: moment().format('YYYY-MM-DD HH:mm:ss.SSS')
        };
        db.PayFlow
            .findOne({ where: { ID: id } })
            .then((specificPayFlow) => {
                if (specificPayFlow) {
                    specificPayFlow.updateAttributes(updatePay)
                        .then((result) => {
                            console.log("update PayFlow Successfully");
                            res.json(result);
                        })
                        .catch((error) => {
                            console.error("db PayFlow update error happened", error);
                        })
                }
                else {
                    console.log("findOne result: payFlow data not found");
                    res.json({ "error": "payFlow data not found" });
                }
            })
            .catch((error) => {
                console.log("findOne error happended", error);
                res.json({ "error": error });
            });
    });

    app.delete('/PayFlow/:id', (req, res) => {
        const id = req.params.id;
        db.PayFlow
            .destroy({
                where: { ID: id }
            })
            .then(() => {
                res.json({ "msg": "Delete data sucessfully" });
            })
            .catch((error) => {
                res.json({ "error": error });
            });
    });
};