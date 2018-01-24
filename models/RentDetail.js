'use strict'
module.exports = (sequelize, DataTypes) => {
    const RentDetail = sequelize.define('RentDetail', {
        RoomID: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, unique: true, field: 'RoomID' },
        UserID: { type: DataTypes.INTEGER, allowNull: true, foreignKey: true, comment: '房客編號', field: 'UserID' },
        RoomNo: { type: DataTypes.STRING(20), allowNull: true, comment: '房號', field: 'RoomNo' },
        RentStartDate: { type: DataTypes.DATE, allowNull: true, comment: '租屋起始日期', field: 'RentStartDate' },
        RentEndDate: { type: DataTypes.DATE, allowNull: true, comment: '租屋結束日期', field: 'RentEndDate' },
        PowerUnitCost: { type: DataTypes.DECIMAL, allowNull: true, comment: '每度電單價', field: 'PowerUnitCost' },
        RentMonthly: { type: DataTypes.DECIMAL, allowNull: true, comment: '房租費用', field: 'RentMonthly' },
        EnterDate: { type: DataTypes.DATE, allowNull: true, comment: '入住日期', field: 'EnterDate' },
        LeaveDate: { type: DataTypes.DATE, allowNull: true, comment: '搬出日期', field: 'LeaveDate' },
        CreateUser: { type: DataTypes.STRING(255), allowNull: true, comment: '資料創始者', field: 'CreateUser' },
        CreateDate: { type: DataTypes.DATE, allowNull: true, comment: '資料創始日期', field: 'CreateDate' },
        ModifyUser: { type: DataTypes.STRING(255), allowNull: true, comment: '資料調整者', field: 'ModifyUser' },
        ModifyDate: { type: DataTypes.DATE, allowNull: true, comment: '資料調整日期', field: 'ModifyDate' },
        Status: { type: DataTypes.INTEGER, allowNull: true, comment: '狀態', field: 'Status' },
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