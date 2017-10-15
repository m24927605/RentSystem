'use strict';

const routes=[
  require('./RentDetail'),
  require('./UserDetail')
];

module.exports = function router(app,db){
  return routes.forEach((route)=>{
    route(app,db);
  });
};