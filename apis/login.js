'use strict'
const express = require('express')
// const config = require('config')
// const Web3 = require('web3')
// const BigNumber = require('bignumber.js')
// const WrapperAbi = require('../abis/WrapperAbi.json')
const router = express.Router()

router.get('/get-message', [
], async function () { })

router.post('/send-signed-messasge', [

], async function (req, res, next) {
    try {
        console.log('leu leu')
    } catch (error) {
        return next(error)
    }
})

module.exports = router
