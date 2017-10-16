'use strict'

module.exports = function (sequelize, DataTypes) {
  const UserDetail = sequelize.define('UserDetail', {
        UserID:{type:DataTypes.INTEGER, autoIncrement:true, primaryKey : true, unique : true},
        RoomID: { type: DataTypes.INTEGER,  allowNull: true,  comment:'房號ID' },        
        UserName: { type: DataTypes.STRING(255), allowNull: true, comment:'姓名' },
        Birth: { type: DataTypes.DATE,  allowNull: true, comment:'出生日期' },
        IDCardNo: { type: DataTypes.CHAR(10),  allowNull: true, comment:'身分證字號' },
        Phone: { type: DataTypes.STRING(255),  allowNull: true, comment:'手機號碼' },
        Career: { type: DataTypes.STRING(255),  allowNull: true, comment:'職業' },
        Address: { type: DataTypes.STRING(255),  allowNull: true, comment:'住址' },
        Email: { type: DataTypes.STRING(255),  allowNull: true, comment:'電子信箱' },
        LineID: { type: DataTypes.STRING(255),  allowNull: true, comment:'LineID' },
        CreateUser: { type: DataTypes.STRING(255), allowNull: true,  comment:'資料創始者' },
        CreateDate: { type: DataTypes.DATE, allowNull: true,  comment:'資料創始日期' },
        ModifyUser: { type: DataTypes.STRING(255), allowNull: true,  comment:'資料調整者' },
        ModifyDate: { type: DataTypes.DATE, allowNull: true,  comment:'資料調整日期' }
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