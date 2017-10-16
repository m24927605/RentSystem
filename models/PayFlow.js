'use strict'

module.exports = function (sequelize, DataTypes) {
  const PayFlow = sequelize.define('PayFlow', {
        ID:{type:DataTypes.INTEGER, autoIncrement:true, primaryKey : true, unique : true},
        UserID: { type: DataTypes.INTEGER,  allowNull: true, comment:'租客ID' },        
        PowerQty: { type: DataTypes.FLOAT, allowNull: true, comment:'使用度數' },
        Payment: { type: DataTypes.DECIMAL(18,0),  allowNull: true, comment:'總費用' },
        PeriodOfPayment: { type: DataTypes.DATE,  allowNull: true, comment:'支付期別' },
        CreateUser: { type: DataTypes.STRING(255), allowNull: true,  comment:'資料創始者' },
        CreateDate: { type: DataTypes.DATE, allowNull: true,  comment:'資料創始日期' },
        ModifyUser: { type: DataTypes.STRING(255), allowNull: true,  comment:'資料調整者' },
        ModifyDate: { type: DataTypes.DATE, allowNull: true,  comment:'資料調整日期' }
  },
  {
      timestamps: false,
      freezeTableName: true,
      tableName: 'PayFlow',
      charset: 'utf8',
      collate: 'utf8_general_ci'
  });
  return PayFlow;
  }