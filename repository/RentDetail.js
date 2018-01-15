'use strict';

module.exports = (db) => {
    return {
        findAll: () => {
            return new Promise((resolve, reject) => {
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
                        resolve(rentDetail);
                    })
                    .catch((error) => {
                        console.error(error);
                        reject(new Error(error));
                    });
            })
        },
        findAndCountAll: (queryObj, size, current) => {
            return new Promise((resolve, reject) => {
                db.RentDetail
                    .findAndCountAll({
                        where: queryObj,
                        offset: size * (current - 1),
                        limit: size,
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
                        resolve([rentDetail.rows, rentDetail.count]);
                    })
                    .catch((error) => {
                        console.error(error);
                        reject(new Error(error));
                    });
            })
        },
        findOne: (queryObj) => {
            return new Promise((resolve, reject) => {
                db.RentDetail
                    .findOne({
                        where: queryObj,
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
                        resolve(rentDetail);
                    })
                    .catch((error) => {
                        reject(new Error(error));
                    });
            })
        },
        createOne: (newRent) => {
            return new Promise((resolve, reject) => {
                db.RentDetail
                    .create(newRent)
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
                db.RentDetail
                    .findOne({ where: queryObj })
                    .then((specificRentDetail) => {
                        if (specificRentDetail) {
                            specificRentDetail.updateAttributes(updateObj)
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
                db.RentDetail
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