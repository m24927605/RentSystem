'use strict'
module.exports=(sequelize, DataTypes)=>{
  const Manager = sequelize.define('Manager', {
    BackerID: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, unique: true },
    Name: { type: DataTypes.STRING(20), allowNull: true, comment: '管理者名稱' },
    Account: { type: DataTypes.STRING(100), allowNull: true, comment: '管理者帳號' },
    Password: { type: DataTypes.STRING(255), allowNull: true, comment: '管理者密碼' },
    CreateUser: { type: DataTypes.STRING(20), allowNull: true, comment: '資料創始者' },
    CreateDate: { type: DataTypes.STRING(255), allowNull: true, comment: '資料創始日期' },
    ModifyUser: { type: DataTypes.STRING(20), allowNull: true, comment: '資料調整者' },
    ModifyDate: { type: DataTypes.STRING(255), allowNull: true, comment: '資料調整日期' }
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