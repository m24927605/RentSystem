'use strict'
module.exports=(sequelize, DataTypes)=>{
  const FAQ = sequelize.define('FAQ', {
    ID: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, unique: true },
    RoomID: { type: DataTypes.INTEGER, allowNull: true, comment: '房間ID' },
    Title: { type: DataTypes.STRING(255), allowNull: true, comment: '標題' },
    Problem: { type: DataTypes.TEXT(), allowNull: true, comment: '問題描述' },
    Solution: { type: DataTypes.TEXT(), allowNull: true, comment: '解決方法' },
    AskingUser:{type: DataTypes.STRING(255), allowNull: true, comment: '發問者'},
    AskingDate: { type: DataTypes.STRING(255), allowNull: true, comment: '發問日期' },
    AnswerUser:{type: DataTypes.STRING(255), allowNull: true, comment: '回答者'},
    AnswerDate: { type: DataTypes.STRING(255), allowNull: true, comment: '回答日期' },
    CreateUser:{type: DataTypes.STRING(255), allowNull: true, comment: '資料創始者'},
    CreateDate: { type: DataTypes.STRING(255), allowNull: true, comment: '資料創始日期' },
    ModifyUser: { type: DataTypes.STRING(255), allowNull: true, comment: '資料調整者' },
    ModifyDate: { type: DataTypes.STRING(255), allowNull: true, comment: '資料調整日期' }
  },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: 'FAQ',
      charset: 'utf8',
      collate: 'utf8_general_ci'
    });
  return FAQ;
}