'use strict';

module.exports = (db) => {
    return {
        findAll: () => {
            return new Promise((resolve, reject) => {
                db.UserDetail
                    .findAll({
                        include: [
                            {
                                model: db.RentDetail
                            }
                        ]
                    })
                    .then(userDetail => {
                        resolve(userDetail);
                    })
                    .catch((error) => {
                        reject(new Error(error));
                    });
            })
        },
        findAndCountAll: (queryObj, size, current) => {
            return new Promise((resolve, reject) => {
                db.UserDetail
                    .findAndCountAll({
                        distinct: true,//避免count在join狀況下出錯
                        where: queryObj,
                        offset: size * (current - 1),
                        limit: size,
                        include: [
                            {
                                model: db.RentDetail
                            }
                        ]
                    })
                    .then(userDetail => {
                        resolve([userDetail.rows, userDetail.count]);
                    })
                    .catch((error) => {
                        reject(new Error(error));
                    });
            })
        },
        findOne: (queryObj) => {
            return new Promise((resolve, reject) => {
                db.UserDetail
                    .findOne({
                        where: queryObj,
                        include: [
                            {
                                model: db.RentDetail
                            }
                        ]
                    })
                    .then(userDetail => {
                        resolve(userDetail);
                    })
                    .catch((error) => {
                        reject(new Error(error));
                    });
            })
        },
        createOne: (newUser) => {
            return new Promise((resolve, reject) => {
                db.UserDetail
                    .create(newUser)
                    .then((result) => {
                        resolve(result);
                    })
                    .catch((error) => {
                        reject(new Error(error));
                    });
            })
        },
        updateOne:(queryObj, updateObj)=>{
            return new Promise((resolve, reject) => {
                db.UserDetail
                    .findOne({ where: queryObj })
                    .then((specificUserDetail) => {
                        if (specificUserDetail) {
                            specificUserDetail.updateAttributes(updateObj)
                                .then((result) => {
                                    resolve(result);
                                })
                                .catch((error) => {
                                    reject(error);
                                })
                        }
                        else {
                            reject(new Error('specific UserDetail data not found'));
                        }
                    })
                    .catch((error) => {
                        reject(new Error(error));
                    });
            })
        },
        deleteOne: (queryObj) => {
            return new Promise((resolve, reject) => {
                db.UserDetail
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