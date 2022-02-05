const Discord = require('discord.js')
const client = new Discord.Client()
const Sequelize = require('sequelize')
require('dotenv').config()

const database = require('./utils/database')
const api = require('./utils/api-interface.js')

console.log('Starting Api.')

function controller(msg) {
    if (msg.content.startsWith("!daily")) {
        api.getDailyAmount(msg)
    }

    if (msg.content.startsWith("!update")) {
        api.recordETHBalance();
        msg.reply('Done')
        api.getDailyAmount(msg)
    }

    if (msg.content.startsWith("!balance")) {
        api.getBalance(msg)
    }
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', async msg => {
    controller(msg)
})

database.sync()
    .then(result => {
        console.log('DB was loaded')
    })
    .catch(err => {
        console.log('DB was not loaded successfully')
    })


client.login(process.env.BOT_TOKEN)

setInterval(function () {
    api.recordETHBalance();
}, 600000);
