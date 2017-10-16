'use strict';

module.exports = (app,db)=>{
    app.get('/PayFlow',(req,res)=>{
        db.UserDetail.findAll({
            include:[
                {
                    model:db.RentDetail,
                    include:[
                        {
                            model:db.UserDetail
                        }
                    ]
                }
            ]
        })
        .then(payFlow=>{
            res.json(payFlow);
        });
    });

    app.get('/PayFlow/:id',(req,res)=>{
        const id= req.params.id;
        db.PayFlow.find({
            where:{ID:id}
        })
        .then(payFlow=>{
            res.json(payFlow);
        });
    });

    app.post('/PayFlow',(req,res)=>{
        
    });

    app.patch('/PayFlow/:id',(req,res)=>{

    });
    
    app.delete('/PayFlow/:id',(req,res)=>{
        const id = req.params.id;
        db.PayFlow.destroy({
            where:{ID:id}
        })
        .then(deletePayFlow=>{
            res.json(deletePayFlow);
        });
    });
};