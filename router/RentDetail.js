'use strict';

module.exports = (app, db) => {
    const moment = require('moment');
    const SQLRentDetail = require('../repository/RentDetail')(db);
    let errorMessage = require('../services/helpers/error')();
    app.get('/RentDetail', (req, res) => {
        try {
            SQLRentDetail.findAll()
                .then((rentDetail) => {
                    res.status(200).json(rentDetail);
                })
                .catch((error) => {
                    res.status(500).json(errorMessage.moduleSend("sequelize", error));
                })
        } catch (err) {
            res.status(500).json(errorMessage.routerSend("RentDetail", err));
        }
    });

    app.get('/RentDetail/:id', (req, res) => {
        try {
            const id = req.params.id;
            let queryObj = { RoomID: id };
            SQLRentDetail.findOne(queryObj)
                .then((rentDetail) => {
                    res.status(200).json(rentDetail);
                })
                .catch((error) => {
                    res.status(500).json(errorMessage.moduleSend("sequelize", error));
                })
        } catch (err) {
            res.status(500).json(errorMessage.routerSend("RentDetail", err));
        }
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
        try {
            const RentStartDate = req.body.RentStartDate;
            const RentEndDate = req.body.RentEndDate;
            const EnterDate = req.body.EnterDate;
            const LeaveDate = req.body.LeaveDate;
            const newRent = {
                UserID: req.body.UserID,
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
            SQLRentDetail.createOne(newRent)
                .then((rentDetail) => {
                    res.status(200).json(rentDetail);
                })
                .catch((error) => {
                    res.status(500).json(errorMessage.moduleSend("sequelize", error));
                })
        } catch (err) {
            res.status(500).json(errorMessage.routerSend("RentDetail", err));
        }
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
        try {
            const id = req.params.id;
            const RentStartDate = req.body.RentStartDate;
            const RentEndDate = req.body.RentEndDate;
            const EnterDate = req.body.EnterDate;
            const LeaveDate = req.body.LeaveDate;
            const updateRent = {
                UserID: req.body.UserID,
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
            let queryObj = { RoomID: id };
            SQLRentDetail.updateOne(queryObj, updateRent)
                .then((rentDetail) => {
                    res.status(200).json(rentDetail);
                })
                .catch((err) => {
                    res.status(500).json(errorMessage.moduleSend("sequelize", error));
                })
        } catch (err) {
            res.status(500).json(errorMessage.routerSend("RentDetail", err));
        }
    });

    app.delete('/RentDetail/:id', (req, res) => {
        try {
            const id = req.params.id;
            let queryObj = { RoomID: id };
            SQLRentDetail.deleteOne(queryObj)
                .then((result) => {
                    res.status(200).json(result);
                })
                .catch((error) => {
                    res.status(500).json(errorMessage.moduleSend("sequelize", error));
                })
        } catch (err) {
            res.status(500).json(errorMessage.routerSend("RentDetail", err));
        }
    });
};