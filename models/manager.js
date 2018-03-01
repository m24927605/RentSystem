'use strict'
module.exports = (sequelize, DataTypes) => {
  const Manager = sequelize.define('Manager', {
    BackerID: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, unique: true, field: 'BackerID' },
    Name: { type: DataTypes.STRING(20), allowNull: true, comment: '管理者名稱', field: 'Name' },
    Account: { type: DataTypes.STRING(100), allowNull: true, comment: '管理者帳號', field: 'Account' },
    Password: { type: DataTypes.STRING(255), allowNull: true, comment: '管理者密碼', field: 'Password' },
    CreateUser: { type: DataTypes.STRING(20), allowNull: true, comment: '資料創始者', field: 'CreateUser' },
    CreateDate: { type: DataTypes.DATE, allowNull: true, comment: '資料創始日期', field: 'CreateDate' },
    ModifyUser: { type: DataTypes.STRING(20), allowNull: true, comment: '資料調整者', field: 'ModifyUser' },
    ModifyDate: { type: DataTypes.DATE, allowNull: true, comment: '資料調整日期', field: 'ModifyDate' },
    Status: { type: DataTypes.INTEGER, allowNull: true, comment: '狀態', field: 'Status' },
    Role: { type: DataTypes.INTEGER, allowNull: true, comment: '角色', field: 'Role' },
  },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: 'Manager',
      charset: 'utf8',
      collate: 'utf8_general_ci'
    });
  return Manager;
}