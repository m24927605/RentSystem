'use strict'
module.exports = (sequelize, DataTypes) => {
  const PayFlow = sequelize.define('PayFlow', {
    ID: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, unique: true, field: 'ID' },
    UserID: { type: DataTypes.INTEGER, allowNull: true, comment: '租客ID', field: 'UserID' },
    RoomNo: { type: DataTypes.STRING(20), allowNull: true, comment: '房號', field: 'RoomNo' },
    PowerQty: { type: DataTypes.FLOAT, allowNull: true, comment: '使用度數', field: 'PowerQty' },
    Payment: { type: DataTypes.DECIMAL(18, 0), allowNull: true, comment: '總費用', field: 'Payment' },
    TimeOfPayment: { type: DataTypes.DATE, allowNull: true, comment: '繳交時間', field: 'TimeOfPayment' },
    RentPeriod: { type: DataTypes.DATE, allowNull: true, comment: '支付期別', field: 'RentPeriod' },
    CreateUser: { type: DataTypes.STRING(20), allowNull: true, comment: '資料創始者', field: 'CreateUser' },
    CreateDate: { type: DataTypes.DATE, allowNull: true, comment: '資料創始日期', field: 'CreateDate' },
    ModifyUser: { type: DataTypes.STRING(20), allowNull: true, comment: '資料調整者', field: 'ModifyUser' },
    ModifyDate: { type: DataTypes.DATE, allowNull: true, comment: '資料調整日期', field: 'ModifyDate' }
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