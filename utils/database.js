const Sequelize = require('sequelize')

const database = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_ROOT_USERNAME ,process.env.DATABASE_ROOT_PASSWORD,{
    dialect: 'mysql',
    host: 'localhost',
    port: '3306'
})

module.exports = database