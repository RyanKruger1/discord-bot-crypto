const axios = require('axios');
const { getEthPriceNow, getEthPriceHistorical } = require('get-eth-price');
const { get } = require('popsicle');
const price = require('../model/price');
const Sequelize = require('sequelize')
const Op = Sequelize.Op;


const price_model = require('../model/price')
const database = require('../utils/database')
const moment = require('moment')

require('dotenv').config()

let balance = 0;

exports.recordETHBalance = () => {
    let date = new Date();
    let dateString = moment(date).format('YYYY-MM-DD')

    axios.get('https://api.luno.com/api/1/balance?assets=ETH', {
        auth: {
            username: process.env.LUNO_KEY_ID,
            password: process.env.LUNO_SECRET
        }
    })
        .then(response => {
            response.data.balance.forEach(element => {
                balance = parseFloat(element.balance) + balance
            });
            axios.get('https://api.luno.com/api/1/tickers?currency=ETH', {
                auth: {
                    username: process.env.LUNO_KEY_ID,
                    password: process.env.LUNO_SECRET
                }
            })
                .then(response => {
                    response.data.tickers.forEach(element => {
                        if (element.pair == 'ETHZAR') {
                            let currency = Math.round(element.ask * balance);
                            price_model.create(
                                {
                                    price: currency,
                                    tick_date: dateString
                                })
                            currency = 0;
                            balance = 0;
                        }
                    });
                })
                .catch(error => {
                    console.log(error);
                });

        })
        .catch(error => {
            console.log(error);
        });
}

exports.testApi = () => {
    axios.get('https://api.luno.com/api/1/tickers?currency=ETH', {
        auth: {

            username: process.env.LUNO_KEY_ID,
            password: process.env.LUNO_SECRET

        }
    })
        .then(response => {
            console.log(response.data.tickers)
            response.data.tickers.forEach(element => {
                if (element.pair == 'ETHZAR') {
                    return element.ask
                }
            });
        })
        .catch(error => {
            console.log(error);
        });
}

exports.getDailyAmount = (msg) => {
    let date = new Date();
    let dateString = moment(date).format('YYYY-MM-DD')

    console.log(dateString)

    price_model.findAll({
        where: {
            tick_date: {
                [Op.like]: dateString
            }
        },
        order: [
            ['createdAt', 'ASC']
        ]
    })
        .then((results) => {
            const len = results.length
            const first = results[0].price
            const last = results[len - 1].price
            msg.reply('Change of price for today: R ' + (last - first))
        })
        .catch(err => {
            console.log(err)
        })
}

exports.getBalance = (msg) => {
    let date = new Date();
    let dateString = moment(date).format('YYYY-MM-DD')

    axios.get('https://api.luno.com/api/1/balance?assets=ETH', {
        auth: {
            username: process.env.LUNO_KEY_ID,
            password: process.env.LUNO_SECRET
        }
    })
        .then(response => {
            response.data.balance.forEach(element => {
                balance = parseFloat(element.balance) + balance
            });
            axios.get('https://api.luno.com/api/1/tickers?currency=ETH', {
                auth: {
                    username: process.env.LUNO_KEY_ID,
                    password: process.env.LUNO_SECRET
                }
            })
                .then(response => {
                    response.data.tickers.forEach(element => {
                        if (element.pair == 'ETHZAR') {
                            let currency = Math.round(element.ask * balance);
                            msg.reply('Current balance is: R' + currency)
                            currency = 0;
                            balance = 0;
                        }
                    });
                })
                .catch(error => {
                    console.log(error);
                });

        })
        .catch(error => {
            console.log(error);
        });
}