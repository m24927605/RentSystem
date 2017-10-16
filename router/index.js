'use strict';

const routes=[
  require('./RentDetail'),
  require('./UserDetail'),
  require('./PayFlow')
];

module.exports = function router(app,db){
  return routes.forEach((route)=>{
    route(app,db);
  });
};