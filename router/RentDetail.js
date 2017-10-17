'use strict';

module.exports = (app, db) => {
    const moment=require('moment');
    app.get('/RentDetail', (req, res) => {
        db.RentDetail.findAll({
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
            });
    });

    app.get('/RentDetail/:id', (req, res) => {
        const id = req.params.id;
        db.RentDetail.find({
            where: { RoomID: id }
        })
            .then(rentDetail => {
                res.json(rentDetail);
            });
    });

    app.post('/RentDetail', (req, res) => {

        const RentStartDate = req.body.RentStartDate;
        const RentEndDate = req.body.RentEndDate;
        const EnterDate = req.body.EnterDate;
        const LeaveDate = req.body.LeaveDate;
        const CreateDate = new Date().toLocaleString();
        const ModifyDate = new Date().toLocaleString();

        const newRent = {
            RoomNo: req.body.RoomNo,
            RentStartDate: moment(`${RentStartDate}`).format('YYYY-MM-DD HH:mm:ss.SSS'),
            RentEndDate: moment(`${RentEndDate}`).format('YYYY-MM-DD HH:mm:ss.SSS'),
            PowerUnitCost: req.body.PowerUnitCost,
            RentMonthly: req.body.RentMonthly,
            EnterDate: moment(`${EnterDate}`).format('YYYY-MM-DD HH:mm:ss.SSS'),
            LeaveDate: moment(`${LeaveDate}`).format('YYYY-MM-DD HH:mm:ss.SSS'),
            Status: req.body.Status,
            CreateUser: req.body.CreateUser,
            CreateDate: moment(`${CreateDate}`).format('YYYY-MM-DD HH:mm:ss.SSS'),
            ModifyUser: req.body.ModifyUser,
            ModifyDate: moment(`${ModifyDate}`).format('YYYY-MM-DD HH:mm:ss.SSS')
        };
        //console.log(JSON.stringify(newRent));
        db.RentDetail
            .create(newRent)
            .then(function (result) {
                console.log("db RentDetail create Successfully");
                res.json(result);
            })
            .catch(function(error){
                console.error("db RentDetail create error happened",error);
            })
            ;
    }); 

    app.patch('/RentDetail/:id', (req, res) => {

    });

    app.delete('/RentDetail/:id', (req, res) => {
        const id = req.params.id;
        db.RentDetail.destroy({
            where: { id: id }
        })
            .then(deleteRentDetail => {
                res.json(deleteRentDetail);
            });
    });
};