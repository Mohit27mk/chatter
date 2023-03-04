const Sequelize = require('sequelize')
const sequelize = require('../util/database')

const UserGroup = sequelize.define('usergroup', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
        allowNull: false
    }
})

module.exports = UserGroup;