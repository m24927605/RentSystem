'use strict';

module.exports = (app, db) => {
    const moment = require('moment');
    app.get('/UserDetail', (req, res) => {
        db.UserDetail
            .findAll({
                include: [
                    {
                        model: db.RentDetail
                    }
                ]
            })
            .then(userDetail => {
                res.json(userDetail);
            });
    });

    app.get('/UserDetail/:id', (req, res) => {
        const id = req.params.id;
        db.UserDetail
            .find({
                where: { UserID: id }
            })
            .then(userDetail => {
                res.json(userDetail);
            });
    });

    app.post('/UserDetail', (req, res) => {
        const Birth = req.body.Birth;
        const CreateDate = new Date().toLocaleString();
        const ModifyDate = new Date().toLocaleString();
        const newUser = {
            RoomID: req.body.RoomID,
            UserName: req.body.UserName,
            Birth: moment(Birth).format('YYYY-MM-DD'),
            IDCardNo: req.body.IDCardNo,
            Phone: req.body.Phone,
            Career: req.body.Career,
            Address: req.body.Address,
            Email: req.body.Email,
            LineID: req.body.LineID,
            CreateUser: req.body.CreateUser,
            CreateDate: moment(`${CreateDate}`).format('YYYY-MM-DD HH:mm:ss.SSS'),
            ModifyUser: req.body.ModifyUser,
            ModifyDate: moment(`${ModifyDate}`).format('YYYY-MM-DD HH:mm:ss.SSS')
        };

        db.UserDetail
            .create(newUser)
            .then((result)=>{
                console.log("db UserDetail create Successfully");
                res.json(result);
            })
            .catch((error)=>{
                console.error("db UserDetail create error happened", error);
            })
    });

    app.patch('/UserDetail/:id', (req, res) => {

    });

    app.delete('/UserDetail/:id', (req, res) => {
        const id = req.params.id;
        db.UserDetail
            .destroy({
                where: { UserID: id }
            })
            .then(deleteUserDetail => {
                res.json(deleteUserDetail);
            });
    });
};