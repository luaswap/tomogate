'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema

var Account = new Schema({
    address: {
        type: String,
        index: true
    },
    jwt: {
        type: String,
        index: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Account', Account)
