const Sequelize = require('sequelize')

const database = new Sequelize('crypto', 'root' ,'goku',{
    dialect: 'mysql',
    host: 'localhost',
    port: '3306'
})

module.exports = database