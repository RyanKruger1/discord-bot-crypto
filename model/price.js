const Sequelize = require('Sequelize')

const sequelize = require('../utils/database')

const price = sequelize.define('ETH',{
    id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    price:{
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    tick_date:{
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = price