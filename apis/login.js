'use strict'
const express = require('express')
const { validationResult } = require('express-validator/check')
const router = express.Router()
const db = require('../models/mongodb')
const server = require('../helpers/grpc')
const grpcError = require('@stackpath/node-grpc-error-details')

router.get('/getMessage', [], async function (req, res, next) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return next(errors.array())
    }
    try {
        const address = req.query.address || ''
        server.authAPI.RequestToken(
            {
                address: address
            },
            (err, response) => {
                if (err) {
                    const error = grpcError.deserializeGoogleGrpcStatusDetails(err)
                    if (!error) {
                        return next(new Error(error.details))
                    } else {
                        return next(new Error(error.details[0].array))
                    }
                } else {
                    return res.send(response)
                }
            }
        )
    } catch (error) {
        return next(error)
    }
})

router.post('/sendSignedMessage', [], async function (req, res, next) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return next(errors.array())
    }
    try {
        const address = req.body.address
        const message = req.body.message
        const signature = req.body.signature

        server.authAPI.Login(
            {
                address,
                message,
                signature
            }, async (err, response) => {
                if (err) {
                    const error = grpcError.deserializeGoogleGrpcStatusDetails(err)
                    if (!error) {
                        return next(new Error(error.details))
                    } else {
                        return next(new Error(error.details[0].array))
                    }
                } else {
                    // store jwt
                    await db.Account.findOneAndUpdate({
                        address: address.toLowerCase()
                    }, {
                        address: address.toLowerCase(),
                        jwt: response.access_token
                    }, { upsert: true })
                    return res.send('OK')
                }
            }
        )
    } catch (error) {
        return next(error)
    }
})

module.exports = router
