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
            });
    });

    app.get('/PayFlow/:id', (req, res) => {
        const id = req.params.id;
        db.PayFlow
            .find({
                where: { ID: id }
            })
            .then(payFlow => {
                res.json(payFlow);
            });
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
            })
    });

    app.patch('/PayFlow/:id', (req, res) => {

    });

    app.delete('/PayFlow/:id', (req, res) => {
        const id = req.params.id;
        db.PayFlow
            .destroy({
                where: { ID: id }
            })
            .then(deletePayFlow => {
                res.json(deletePayFlow);
            });
    });
};