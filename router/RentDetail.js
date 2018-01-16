'use strict';

module.exports = (app, db) => {
    const moment = require('moment');
    const SQLRentDetail = require('../repository/RentDetail')(db);
    const errorMessage = require('../services/helpers/error')();
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

    app.get('/RentDetail/:sizePage/:currentPage', (req, res) => {
        try {
            let RoomNo = req.query.RoomNo;
            let queryObj ={};
            if(RoomNo){
                queryObj = { RoomNo: RoomNo };
            }           
            let sizePage = +req.params['sizePage'];
            let currentPage = +req.params['currentPage'];
            SQLRentDetail.findAndCountAll(queryObj, sizePage, currentPage)
                .then(([rentDetail, total]) => {
                    let resObj = {
                        size: sizePage,
                        current: currentPage,
                        total: total,
                        data: rentDetail
                    }
                    res.status(200).json(resObj);
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
            let id = req.params.id;
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
            let RentStartDate = req.body.RentStartDate;
            let RentEndDate = req.body.RentEndDate;
            let EnterDate = req.body.EnterDate;
            let LeaveDate = req.body.LeaveDate;
            let newRent = {
                UserID: req.body.UserID,
                RoomNo: req.body.RoomNo,
                RentStartDate: moment(RentStartDate).toDate(),
                RentEndDate: moment(RentEndDate).toDate(),
                PowerUnitCost: req.body.PowerUnitCost,
                RentMonthly: req.body.RentMonthly,
                EnterDate: moment(EnterDate).toDate(),
                LeaveDate: moment(LeaveDate).toDate(),
                Status: req.body.Status,
                CreateUser: req.body.CreateUser,
                CreateDate: moment().toDate(),
                ModifyUser: "",
                ModifyDate: null
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
            let id = req.params.id;
            let RentStartDate = req.body.RentStartDate;
            let RentEndDate = req.body.RentEndDate;
            let EnterDate = req.body.EnterDate;
            let LeaveDate = req.body.LeaveDate;
            let updateRent = {
                UserID: req.body.UserID,
                RoomNo: req.body.RoomNo,
                RentStartDate: moment(RentStartDate).toDate(),
                RentEndDate: moment(RentEndDate).toDate(),
                PowerUnitCost: req.body.PowerUnitCost,
                RentMonthly: req.body.RentMonthly,
                EnterDate: moment(EnterDate).toDate(),
                LeaveDate: moment(LeaveDate).toDate(),
                Status: req.body.Status,
                ModifyUser: req.body.ModifyUser,
                ModifyDate: moment().toDate()
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
            let id = req.params.id;
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