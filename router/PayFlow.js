'use strict';

module.exports = (app, db) => {
    const moment = require('moment');
    app.get('/PayFlow', (req, res) => {
        db.PayFlow
            .findAll({
                include: [
                    {
                        model: db.UserDetail
                    }
                ]
            })
            .then(payFlow => {
                res.json(payFlow);
            })
            .catch((error)=>{
                res.json({"error":error});
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
            .catch((error)=>{
                res.json({"error":error});
            })
    });

    app.post('/PayFlow', (req, res) => {
        const periodOfPayment = req.body.PeriodOfPayment;
        const CreateDate = new Date().toLocaleString();
        const ModifyDate = new Date().toLocaleString();
        const payDetail = {
            UserID: req.body.UserID,
            PowerQty: parseFloat(req.body.PowerQty),
            Payment: parseFloat(req.body.Payment),
            PeriodOfPayment: moment(periodOfPayment).format('YYYY-MM-DD'),
            CreateUser: req.body.CreateUser,
            CreateDate: moment(`${CreateDate}`).format('YYYY-MM-DD HH:mm:ss.SSS'),
            ModifyUser: req.body.ModifyUser,
            ModifyDate: moment(`${ModifyDate}`).format('YYYY-MM-DD HH:mm:ss.SSS')
        };
        db.PayFlow
            .create(payDetail)
            .then((result)=>{
                console.log("db PayFlow create Successfully");
                res.json(result);
            })
            .catch((error)=>{
                console.error("db PayFlow create error happened", error);
            });
    });

    app.patch('/PayFlow/:id', (req, res) => {
        const id = req.params.id;
        const periodOfPayment = req.body.PeriodOfPayment;
        const ModifyDate = new Date().toLocaleString();
        const updatePay = {
            UserID: req.body.UserID,
            PowerQty: parseFloat(req.body.PowerQty),
            Payment: parseFloat(req.body.Payment),
            PeriodOfPayment: moment(periodOfPayment).format('YYYY-MM-DD'),
            ModifyUser: req.body.ModifyUser,
            ModifyDate: moment(`${ModifyDate}`).format('YYYY-MM-DD HH:mm:ss.SSS')
        };
        db.PayFlow.findOne({ where: { ID: id } })
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
                res.json({"msg":"Delete data sucessfully"});
            })
            .catch((error)=>{
                res.json({ "error": error });
            });
    });
};