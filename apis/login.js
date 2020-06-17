'use strict'
const express = require('express')
// const config = require('config')
// const Web3 = require('web3')
// const BigNumber = require('bignumber.js')
// const WrapperAbi = require('../abis/WrapperAbi.json')
const { validationResult } = require('express-validator/check')
const server = require('../helpers/grpc')
const router = express.Router()

router.get('/getMessage', [], async function (req, res, next) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return next(errors.array())
    }
    try {
        const address = req.query.address || ''
        server.authAPI.runService(
            'RequestToken',
            {
                address
            },
            (err, response) => {
                if (err) {
                    return next(err)
                } else {
                    return res.send(response)
                }
            }
        )
    } catch (error) {
        return next(error)
    }
})

router.post('/sendSignedMessasge', [], async function (req, res, next) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return next(errors.array())
    }
    try {
        const address = req.body.address
        const message = req.body.message
        const signature = req.body.signature
        server.authAPI.runService(
            'Login',
            {
                address,
                message,
                signature
            }, (err, response) => {
                if (err) {
                    return next(err)
                } else {
                    return res.send(response)
                }
            }
        )
    } catch (error) {
        return next(error)
    }
})

module.exports = router
