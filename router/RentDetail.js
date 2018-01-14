'use strict';

module.exports = (app, db) => {
    const moment = require('moment');
    app.get('/RentDetail', (req, res) => {
        db.RentDetail
            .findAll({
                include: [
                    {
                        model: db.UserDetail,
                        include: [
                            {
                                model: db.PayFlow
                            }
                        ]
                    }
                ]
            })
            .then(rentDetail => {
                res.json(rentDetail);
            })
            .catch((error) => {
                res.json({ "error": error });
            });
    });

    app.get('/RentDetail/:id', (req, res) => {
        const id = req.params.id;
        db.RentDetail
            .findOne({
                where: { RoomID: id }
            })
            .then(rentDetail => {
                res.json(rentDetail);
            })
            .catch((error) => {
                res.json({ "error": err });
            });
    });
    /**
     * @description 測試資料
     * @example {
                "RoomNo": "9502",
                "RentStartDate": "2017-12-01",
                "RentEndDate": "2018-12-01",
                "PowerUnitCost": 4,
                "RentMonthly": 7800,
                "EnterDate": "2017-12-02",
                "LeaveDate": "2018-11-30",
                "Status": "Y",
                "CreateUser": "System"
            }
     */
    app.post('/RentDetail', (req, res) => {

        const RentStartDate = req.body.RentStartDate;
        const RentEndDate = req.body.RentEndDate;
        const EnterDate = req.body.EnterDate;
        const LeaveDate = req.body.LeaveDate;
        const newRent = {
            UserID:req.body.UserID,
            RoomNo: req.body.RoomNo,
            RentStartDate: moment(`${RentStartDate}`).format('YYYY-MM-DD HH:mm:ss.SSS'),
            RentEndDate: moment(`${RentEndDate}`).format('YYYY-MM-DD HH:mm:ss.SSS'),
            PowerUnitCost: req.body.PowerUnitCost,
            RentMonthly: req.body.RentMonthly,
            EnterDate: moment(`${EnterDate}`).format('YYYY-MM-DD HH:mm:ss.SSS'),
            LeaveDate: moment(`${LeaveDate}`).format('YYYY-MM-DD HH:mm:ss.SSS'),
            Status: req.body.Status,
            CreateUser: req.body.CreateUser,
            CreateDate: moment().format('YYYY-MM-DD HH:mm:ss.SSS'),
            ModifyUser: "",
            ModifyDate: ""
        };

        db.RentDetail
            .create(newRent)
            .then((result) => {
                console.log("db RentDetail create Successfully");
                res.json(result);
            })
            .catch((error) => {
                console.error("db RentDetail create error happened", error);
            });
    });
    /**
     * @description 測試資料
     * @example {
                "RoomNo": "9502",
                "RentStartDate": "2017-12-01",
                "RentEndDate": "2018-12-01",
                "PowerUnitCost": 4,
                "RentMonthly": 10000,
                "EnterDate": "2017-12-02",
                "LeaveDate": "2018-11-30",
                "Status": "Y",
                "CreateUser": "System",
                "ModifyUser": "System"
            }
     */
    app.patch('/RentDetail/:id', (req, res) => {
        const id = req.params.id;
        const RentStartDate = req.body.RentStartDate;
        const RentEndDate = req.body.RentEndDate;
        const EnterDate = req.body.EnterDate;
        const LeaveDate = req.body.LeaveDate;
        const updateRent = {
            UserID:req.body.UserID,
            RoomNo: req.body.RoomNo,
            RentStartDate: moment(`${RentStartDate}`).format('YYYY-MM-DD HH:mm:ss.SSS'),
            RentEndDate: moment(`${RentEndDate}`).format('YYYY-MM-DD HH:mm:ss.SSS'),
            PowerUnitCost: req.body.PowerUnitCost,
            RentMonthly: req.body.RentMonthly,
            EnterDate: moment(`${EnterDate}`).format('YYYY-MM-DD HH:mm:ss.SSS'),
            LeaveDate: moment(`${LeaveDate}`).format('YYYY-MM-DD HH:mm:ss.SSS'),
            Status: req.body.Status,
            ModifyUser: req.body.ModifyUser,
            ModifyDate: moment().format('YYYY-MM-DD HH:mm:ss.SSS')
        };
        db.RentDetail
            .findOne({ where: { RoomID: id } })
            .then((specificRentDetail) => {
                if (specificRentDetail) {
                    specificRentDetail.updateAttributes(updateRent)
                        .then((result) => {
                            console.log("update RentDetail Successfully");
                            res.json(result);
                        })
                        .catch((error) => {
                            console.error("db RentDetail update error happened", error);
                        })
                }
                else {
                    console.log("findOne result: entDetail data not found");
                    res.json({ "error": "rentDetail data not found" });
                }
            })
            .catch((error) => {
                console.log("findOne error happended", error);
                res.json({ "error": error });
            });
    });

    app.delete('/RentDetail/:id', (req, res) => {
        const id = req.params.id;
        db.RentDetail
            .destroy({
                where: { RoomID: id }
            })
            .then(() => {
                res.json({ "msg": "Delete data sucessfully" });
            })
            .catch((error) => {
                res.json({ "error": error });
            });
    });
};