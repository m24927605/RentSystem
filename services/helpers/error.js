'use strict';

module.exports = () => {
    const errConfig = require('../../config/error.config.json');
    const PrettyError = require('pretty-error');
    const pe = new PrettyError();
    return {
        /**
         * 封裝錯誤訊息response
         * 
         * @param {string} errType error type
         * @param {any} error error object
         * 
         * @return {{ 'error': errObj }}
         */
        paramCheckSend: (errType, err) => {
            try {
                console.error(pe.render(err));
                let errObj = {};
                errObj.error = errConfig.paramValidate[errType];
                errObj.error.errorDetail =  `${err}`;
                if(typeof err==='object'){
                    errObj.error.errorDetail=err;
                }
                return errObj;
            }
            catch (err) {
                console.error('paramCheckSend() 發生錯誤', err);
            }
        },
        moduleSend: (errType, err) => {
            try {
                console.error(pe.render(err));
                let errObj = {};
                errObj.error = errConfig.module[errType];
                errObj.error.errorDetail = `${err}`;
                return errObj;
            }
            catch (err) {
                console.error('moduleSend() 發生錯誤', err);
            }
        },
        logicSend: (errType, err) => {
            try {
                console.error(pe.render(err));
                let errObj = {};
                errObj.error = errConfig.logic[errType];
                errObj.error.errorDetail =  `${err}`;
                return errObj;
            }
            catch (err) {
                console.error('logicSend() 發生錯誤', err);
            }
        },
        routerSend: (errType, err) => {
            try {
                console.error(pe.render(err));
                let errObj = {};
                errObj.error = errConfig.router[errType];
                errObj.error.errorDetail =  `${err}`;
                return errObj;
            }
            catch (err) {
                console.error('routerSend() 發生錯誤', err);
            }
        }
    }
}