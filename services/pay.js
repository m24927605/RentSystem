'use strict';

module.exports = () => {
    let errorMessage = require('./helpers/error')();
    const math = require('mathjs');

    return {
        calculatePay: (payType, powerQty, rentCost, TVcost) => {
            return new Promise((resolve, reject) => {
                try {
                    let payment = 0;
                    let expression = '';
                    switch (payType) {
                        case 1:
                            //正常繳
                            //電費+房租
                            expression = `${powerQty} * 4 + ${rentCost}`;
                            payment = math.eval(expression);
                            break;
                        case 2:
                            //6個月躉繳-一個月的1/4房租
                            expression = `${powerQty} * 4 + ( ( ( ${rentCost} * 6) -( ${rentCost} * 1 / 4 ) ) / 6)`;
                            payment = math.eval(expression);
                            break;
                        case 3:
                            //電費+房租+有線電視費用
                            expression = `${powerQty} * 4 + ${rentCost} + ${TVcost}`;
                            payment = math.eval(expression);
                            break;
                        case 4:
                            //6個月躉繳-一個月的1/4房租+有線電視費用
                            expression = `${powerQty} * 4 + ( ( ( ${rentCost} * 6) -( ${rentCost} * 1 / 4 ) ) / 6) + ${TVcost}`;
                            payment = math.eval(expression);
                            break;
                        default:
                            payment = 0;
                            break;
                    }
                    resolve(payment);
                } catch (err) {
                    reject(err);
                }
            })

        }
    }
}