'use strict';

const routes = [
  require('./rentDetail'),
  require('./userDetail'),
  require('./payFlow'),
  require('./manager'),
  require('./other'),
  require('./login')
];

module.exports = function router(app, db) {
  return routes.forEach((route) => {
    route(app, db);
  });
};