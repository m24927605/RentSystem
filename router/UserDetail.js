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
            })
            .catch((error) => {
                res.json({ "error": error });
            });
    });

    app.get('/UserDetail/:id', (req, res) => {
        const id = req.params.id;
        db.UserDetail
            .findOne({
                where: { UserID: id }
            })
            .then(userDetail => {
                res.json(userDetail);
            })
            .catch((error) => {
                res.json({ "error": error });
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
            ContacterPhone:req.body.ContacterPhone,
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
            .then((result) => {
                console.log("db UserDetail create Successfully");
                res.json(result);
            })
            .catch((error) => {
                console.error("db UserDetail create error happened", error);
            });
    });

    app.patch('/UserDetail/:id', (req, res) => {
        const id = req.params.id;
        const Birth = req.body.Birth;
        const ModifyDate = new Date().toLocaleString();
        const updateUser = {
            RoomID: req.body.RoomID,
            UserName: req.body.UserName,
            Birth: moment(Birth).format('YYYY-MM-DD'),
            IDCardNo: req.body.IDCardNo,
            Phone: req.body.Phone,
            ContacterPhone:req.body.ContacterPhone,
            Career: req.body.Career,
            Address: req.body.Address,
            Email: req.body.Email,
            LineID: req.body.LineID,
            ModifyUser: req.body.ModifyUser,
            ModifyDate: moment(`${ModifyDate}`).format('YYYY-MM-DD HH:mm:ss.SSS')
        };
        db.UserDetail
            .findOne({ where: { UserID: id } })
            .then((specificUserDetail) => {
                if (specificUserDetail) {
                    specificUserDetail.updateAttributes(updateUser)
                        .then((result) => {
                            console.log("update UserDetail Successfully");
                            res.json(result);
                        })
                        .catch((error) => {
                            console.error("db UserDetail update error happened", error);
                        })
                }
                else {
                    console.log("findOne result: userDetail data not found");
                    res.json({ "error": "userDetail data not found" });
                }
            })
            .catch((error) => {
                console.log("findOne error happended", error);
                res.json({ "error": error });
            });
    });

    app.delete('/UserDetail/:id', (req, res) => {
        const id = req.params.id;
        db.UserDetail
            .destroy({
                where: { UserID: id }
            })
            .then(() => {
                res.json({ "msg": "Delete data sucessfully" });
            })
            .catch((error) => {
                res.json({ "error": error });
            });
    });
};