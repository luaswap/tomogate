'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema

var Project = new Schema({
    name: String,
    smartContractAddresses: [{
        type: String,
        index: true
    }],
    Status: {
        type: String,
        index: true
    },
    owner: {
        type: String,
        index: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Project', Project)
