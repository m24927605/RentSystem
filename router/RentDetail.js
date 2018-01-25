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
            let queryObj = {Status: 1};
            if (RoomNo) {
                queryObj = { RoomNo: RoomNo, Status: 1 };
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

    app.get('/RentDetail/NoPage', (req, res) => {
        try {
            let RoomID = req.query.RoomID;
            let queryObj = {};
            if (RoomID) {
                queryObj = { RoomID: RoomID, Status: 1 };
            }
            SQLRentDetail.findAllWhere(queryObj)
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
            let id = req.params.id;
            let queryObj = { RoomID: id, Status: 1 };
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

    app.post('/RentDetail', (req, res) => {
        try {
            let RentStartDate = req.body.RentStartDate;
            let RentEndDate = req.body.RentEndDate;
            let EnterDate = req.body.EnterDate;
            let LeaveDate = req.body.LeaveDate;

            if (RentStartDate) {
                RentStartDate = moment(RentStartDate).toDate();
            }
            if (RentEndDate) {
                RentEndDate = moment(RentEndDate).toDate();
            }
            if (EnterDate) {
                EnterDate = moment(EnterDate).toDate();
            }
            if (LeaveDate) {
                LeaveDate = moment(LeaveDate).toDate();
            }

            let newRent = {
                UserID: req.body.UserID,
                RoomNo: req.body.RoomNo,
                RentStartDate: RentStartDate,
                RentEndDate: RentEndDate,
                PowerUnitCost: req.body.PowerUnitCost,
                RentMonthly: req.body.RentMonthly,
                EnterDate: EnterDate,
                LeaveDate: LeaveDate,
                CreateUser: req.body.CreateUser,
                CreateDate: moment().toDate(),
                ModifyUser: "",
                ModifyDate: null,
                Status: 1
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

    app.patch('/RentDetail/:id', (req, res) => {
        try {
            let id = req.params.id;
            let RentStartDate = req.body.RentStartDate;
            let RentEndDate = req.body.RentEndDate;
            let EnterDate = req.body.EnterDate;
            let LeaveDate = req.body.LeaveDate;
            let Status = req.body.Status;
            if (RentStartDate) {
                RentStartDate = moment(RentStartDate).toDate();
            }
            if (RentEndDate) {
                RentEndDate = moment(RentEndDate).toDate();
            }
            if (EnterDate) {
                EnterDate = moment(EnterDate).toDate();
            }
            if (LeaveDate) {
                LeaveDate = moment(LeaveDate).toDate();
                Status = 0;
            }
            let updateRent = {
                UserID: req.body.UserID,
                RoomNo: req.body.RoomNo,
                RentStartDate: RentStartDate,
                RentEndDate: RentEndDate,
                PowerUnitCost: req.body.PowerUnitCost,
                RentMonthly: req.body.RentMonthly,
                EnterDate: EnterDate,
                LeaveDate: LeaveDate,
                ModifyUser: req.body.ModifyUser,
                ModifyDate: moment().toDate(),
                Status: Status
            };
            let queryObj = { RoomID: id };
            SQLRentDetail.updateOne(queryObj, updateRent)
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