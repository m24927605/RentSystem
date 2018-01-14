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
                where: { UserID: id },
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
    /**
     * @description 測試資料
     * @example {
        "RoomID": "1",
        "UserName": "TEST",
        "Birth": "1992-04-26",
        "IDCardNo": "L124799531",
        "Phone": "0910723969",
        "ContacterPhone": "5566",
        "Career": "IT",
        "Address": "新北市忠和區景新街389號",
        "Email": "m24927605@gmail.com",
        "LineID": "dali17dali17"
    }
     */
    app.post('/UserDetail', (req, res) => {
        const Birth = req.body.Birth;
        const newUser = {
            RoomID: req.body.RoomID,
            UserName: req.body.UserName,
            Birth: moment(Birth).format('YYYY-MM-DD'),
            IDCardNo: req.body.IDCardNo,
            Phone: req.body.Phone,
            ContacterPhone: req.body.ContacterPhone,
            Career: req.body.Career,
            Address: req.body.Address,
            Email: req.body.Email,
            LineID: req.body.LineID,
            CreateUser: req.body.CreateUser,
            CreateDate: moment().format('YYYY-MM-DD HH:mm:ss.SSS'),
            ModifyUser: "",
            ModifyDate: ""
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

    /**
     * @example{
        "RoomID": "1",
        "UserName": "Ted",
        "Birth": "1992-04-26",
        "IDCardNo": "L124799531",
        "Phone": "0910723969",
        "ContacterPhone": "123456",
        "Career": "IT",
        "Address": "新北市忠和區景新街389號",
        "Email": "m24927605@gmail.com",
        "LineID": "dali17dali17",
        "ModifyUser": "System"
    }
     */
    app.patch('/UserDetail/:id', (req, res) => {
        const id = req.params.id;
        const Birth = req.body.Birth;
        const updateUser = {
            RoomID: req.body.RoomID,
            UserName: req.body.UserName,
            Birth: moment(Birth).format('YYYY-MM-DD'),
            IDCardNo: req.body.IDCardNo,
            Phone: req.body.Phone,
            ContacterPhone: req.body.ContacterPhone,
            Career: req.body.Career,
            Address: req.body.Address,
            Email: req.body.Email,
            LineID: req.body.LineID,
            ModifyUser: req.body.ModifyUser,
            ModifyDate: moment().format('YYYY-MM-DD HH:mm:ss.SSS')
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