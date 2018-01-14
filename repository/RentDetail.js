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
        findAndCountAll: (model, query, size, current) => {
            return new Promise((resolve, reject) => {
                db.RentDetail
                    .findAndCountAll({
                        attributes: model,
                        where: query,
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
                        reject(error);
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
                            reject(new Error('rentDetail data not found'));
                        }
                    })
                    .catch((error) => {
                        reject(error);
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
                        reject(error);
                    });
            })
        }
    }
}