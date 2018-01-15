'use strict';

module.exports = (db) => {
    return {
        findAll: () => {
            return new Promise((resolve, reject) => {
                db.Manager
                    .findAll()
                    .then(manager => {
                        resolve(manager);
                    })
                    .catch((error) => {
                        reject(new Error(error));
                    });
            })
        },
        findAndCountAll: (model, query, size, current) => {
            return new Promise((resolve, reject) => {
                db.Manager
                    .findAndCountAll({
                        attributes: model,
                        where: query,
                        offset: size * (current - 1),
                        limit: size
                    })
                    .then(manager => {
                        resolve([manager.rows, manager.count]);
                    })
                    .catch((error) => {
                        reject(new Error(error));
                    });
            })
        },
        findOne: (queryObj) => {
            return new Promise((resolve, reject) => {
                db.Manager
                    .findOne({
                        where: queryObj
                    })
                    .then(manager => {
                        resolve(manager);
                    })
                    .catch((error) => {
                        reject(new Error(error));
                    })
            })
        },
        createOne: (newManager) => {
            return new Promise((resolve, reject) => {
                db.Manager
                    .create(newManager)
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
                db.Manager
                    .findOne({ where: queryObj })
                    .then((specificManager) => {
                        if (specificManager) {
                            specificManager.updateAttributes(updateObj)
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
                db.Manager
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