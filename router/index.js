'use strict';

const routes=[
  require('./RentDetail')
];

module.exports = function router(app,db){
  return routes.forEach((route)=>{
    route(app,db);
  });
};