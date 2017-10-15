'use strict';

module.exports = (app,db)=>{
    app.get('/UserDetail',(req,res)=>{
        db.UserDetail.findAll()
        .then(userDetail=>{
            res.json(userDetail);
        });
    });

    app.get('/UserDetail/:id',(req,res)=>{
        const id= req.params.id;
        db.UserDetail.find({
            where:{RoomID:id}
        })
        .then(userDetail=>{
            res.json(userDetail);
        });
    });

    app.post('/UserDetail',(req,res)=>{
        
    });

    app.patch('/UserDetail/:id',(req,res)=>{

    });
    
    app.delete('/UserDetail/:id',(req,res)=>{
        const id = req.params.id;
        db.UserDetail.destroy({
            where:{UserID:id}
        })
        .then(deleteUserDetail=>{
            res.json(deleteUserDetail);
        });
    });
};