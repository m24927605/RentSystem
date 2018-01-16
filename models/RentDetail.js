'use strict'
module.exports = (sequelize, DataTypes) => {
    const RentDetail = sequelize.define('RentDetail', {
        RoomID: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, unique: true },
        UserID: { type: DataTypes.INTEGER, allowNull: true, comment: '房客編號' },
        RoomNo: { type: DataTypes.STRING(20), allowNull: true, comment: '房號' },
        RentStartDate: { type: DataTypes.DATE, allowNull: true, comment: '租屋起始日期' },
        RentEndDate: { type: DataTypes.DATE, allowNull: true, comment: '租屋結束日期' },
        PowerUnitCost: { type: DataTypes.DECIMAL, allowNull: true, comment: '每度電單價' },
        RentMonthly: { type: DataTypes.DECIMAL, allowNull: true, comment: '房租費用' },
        EnterDate: { type: DataTypes.DATE, allowNull: true, comment: '入住日期' },
        LeaveDate: { type: DataTypes.DATE, allowNull: true, comment: '搬出日期' },
        Status: { type: DataTypes.CHAR(2), allowNull: true, comment: '狀態' },
        CreateUser: { type: DataTypes.STRING(255), allowNull: true, comment: '資料創始者' },
        CreateDate: { type: DataTypes.DATE, allowNull: true, comment: '資料創始日期' },
        ModifyUser: { type: DataTypes.STRING(255), allowNull: true, comment: '資料調整者' },
        ModifyDate: { type: DataTypes.DATE, allowNull: true, comment: '資料調整日期' },
        CalculateType: { type: DataTypes.INTEGER, allowNull: true, comment: '繳費種類' }
    },
        {
            timestamps: false,
            freezeTableName: true,
            tableName: 'RentDetail',
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    return RentDetail;
}