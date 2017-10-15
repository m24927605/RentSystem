'use strict';

module.exports = (app,db)=>{
    app.get('/RentDetail',(req,res)=>{
        db.RentDetail.findAll()
        .then(rentDetail=>{
            res.json(rentDetail);
        });
    });

    app.get('/RentDetail/:id',(req,res)=>{
        const id= req.params.id;
        db.RentDetail.find({
            where:{RoomID:id}
        })
        .then(rentDetail=>{
            res.json(rentDetail);
        });
    });

    app.post('/RentDetail',(req,res)=>{
        
    });

    app.patch('/RentDetail/:id',(req,res)=>{

    });
    
    app.delete('/RentDetail/:id',(req,res)=>{
        const id = req.params.id;
        db.RentDetail.destroy({
            where:{id:id}
        })
        .then(deleteRentDetail=>{
            res.json(deleteRentDetail);
        });
    });
};