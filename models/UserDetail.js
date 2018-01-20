'use strict'
module.exports = (sequelize, DataTypes) => {
  const UserDetail = sequelize.define('UserDetail', {
    UserID: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, unique: true, field: 'UserID' },
    UserName: { type: DataTypes.STRING(20), allowNull: true, comment: '姓名', field: 'UserName' },
    Birth: { type: DataTypes.DATEONLY, allowNull: true, comment: '出生日期', field: 'Birth' },
    Sex: { type: DataTypes.STRING(2), allowNull: true, comment: '性別', field: 'Sex' },
    IDCardNo: { type: DataTypes.STRING(20), allowNull: true, comment: '身分證字號', field: 'IDCardNo' },
    Phone: { type: DataTypes.STRING(20), allowNull: true, comment: '手機號碼', field: 'Phone' },
    ContactUser: { type: DataTypes.STRING(20), allowNull: true, comment: '緊急聯絡人', field: 'ContactUser' },
    ContactUserPhone: { type: DataTypes.STRING(20), allowNull: true, comment: '緊急聯絡人手機號碼', field: 'ContactUserPhone' },
    Career: { type: DataTypes.STRING(50), allowNull: true, comment: '職業', field: 'Career' },
    Address: { type: DataTypes.STRING(100), allowNull: true, comment: '住址', field: 'Address' },
    Email: { type: DataTypes.STRING(100), allowNull: true, comment: '電子信箱', field: 'Email' },
    LineID: { type: DataTypes.STRING(50), allowNull: true, comment: 'LineID', field: 'LineID' },
    CalculateType: { type: DataTypes.INTEGER, allowNull: true, comment: '繳費種類', field: 'CalculateType' },
    TVCost: { type: DataTypes.INTEGER, allowNull: true, comment: '有線電視費用', field: 'TVCost' },
    CreateUser: { type: DataTypes.STRING(20), allowNull: true, comment: '資料創始者', field: 'CreateUser' },
    CreateDate: { type: DataTypes.DATE, allowNull: true, comment: '資料創始日期', field: 'CreateDate' },
    ModifyUser: { type: DataTypes.STRING(20), allowNull: true, comment: '資料調整者', field: 'ModifyUser' },
    ModifyDate: { type: DataTypes.DATE, allowNull: true, comment: '資料調整日期', field: 'ModifyDate' }
  },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: 'UserDetail',
      charset: 'utf8',
      collate: 'utf8_general_ci'
    });
  return UserDetail;
}
