const Sequelize = require('sequelize');
const sequelize=require('../util/database');

const Admin = sequelize.define('admin', {
    id : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true,
    },
    groupId : {
        type : Sequelize.INTEGER,
        allowNul : false
    },
    userId : {
        type: Sequelize.INTEGER,
        allowNul : false
    }
});

module.exports = Admin;