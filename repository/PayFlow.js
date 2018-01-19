'use strict';

module.exports = (db) => {
    const S=require('sequelize');
    return {
        findAll: () => {
            return new Promise((resolve, reject) => {
                db.PayFlow
                    .findAll({
                        include: [
                            {
                                model: db.UserDetail,
                                include: [
                                    {
                                        model: db.RentDetail
                                    }
                                ]
                            }
                        ]
                    })
                    .then(payFlow => {
                        resolve(payFlow);
                    })
                    .catch((error) => {
                        reject(new Error(error));
                    });
            })
        },
        findAndCountAll: (queryObj, size, current) => {
            return new Promise((resolve, reject) => {
                let whereObj = { where: queryObj };
                let obj = {
                    offset: size * (current - 1),
                    limit: size,
                    attributes: [
                        [S.col('UserDetail.UserName'),'UserName'],
                        'ID',
                        'UserID',
                        'PowerQty',
                        'Payment',
                        'TimeOfPayment',
                        'CreateUser',
                        'CreateDate',
                        'ModifyUser',
                        'ModifyDate',
                        'RoomNo',
                        'RentPeriod'
                    ],
                    include: [
                        {
                            model: db.UserDetail,
                            include: [
                                {
                                    model: db.RentDetail
                                }
                            ]
                        }
                    ]
                };
                if (Object.values(queryObj)[0]) {
                    //有where條件，將where條件合併加入
                    Object.assign(obj, whereObj);
                }
                db.PayFlow
                    .findAndCountAll(obj)
                    .then(payFlow => {
                        resolve([payFlow.rows, payFlow.count]);
                    })
                    .catch((error) => {
                        reject(new Error(error));
                    });
            })
        },
        findOne: (queryObj) => {
            return new Promise((resolve, reject) => {
                db.PayFlow
                    .findOne({
                        where: queryObj,
                        include: [
                            {
                                model: db.UserDetail,
                                include: [
                                    {
                                        model: db.RentDetail
                                    }
                                ]
                            }
                        ]
                    })
                    .then(payFlow => {
                        resolve(payFlow);
                    })
                    .catch((error) => {
                        reject(new Error(error));
                    })
            })
        },
        createOne: (newPayFlow) => {
            return new Promise((resolve, reject) => {
                db.PayFlow
                    .create(newPayFlow)
                    .then((result) => {
                        resolve(result);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            })
        },
        updateOne: (queryObj, updateObj) => {
            return new Promise((resolve, reject) => {
                db.PayFlow
                    .findOne({ where: queryObj })
                    .then((specificPayFlow) => {
                        if (specificPayFlow) {
                            specificPayFlow.updateAttributes(updateObj)
                                .then((result) => {
                                    resolve(result);
                                })
                                .catch((error) => {
                                    reject(error);
                                })
                        }
                        else {
                            reject(new Error('specific RentDetail data not found'));
                        }
                    })
                    .catch((error) => {
                        reject(new Error(error));
                    });
            })
        },
        deleteOne: (queryObj) => {
            return new Promise((resolve, reject) => {
                db.PayFlow
                    .destroy({
                        where: queryObj
                    })
                    .then((result) => {
                        resolve(result);
                    })
                    .catch((error) => {
                        reject(new Error(error));
                    });
            })
        }
    }
}