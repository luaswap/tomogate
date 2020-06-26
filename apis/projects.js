'use strict'
const express = require('express')
const router = express.Router()
const db = require('../models/mongodb')
const { check, validationResult, query } = require('express-validator/check')
const server = require('../helpers/grpc')
const grpc = require('grpc')
const grpcError = require('@stackpath/node-grpc-error-details')

router.get('/get-project/:owner', [
    query('id'),
    query('page').isNumeric({ no_symbols: true }).optional()
        .isInt({ min: 0, max: 500 }).withMessage('page should greater than 0 and less than 500'),
    query('limit').isInt({ min: 0, max: 200 }).optional().withMessage('limit should greater than 0 and less than 200')
], async function (req, res, next) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return next(errors.array())
    }
    try {
        const owner = (req.params.owner || '').toLowerCase()
        // let limit = (req.query.limit) ? parseInt(req.query.limit) : 100
        // let skip = (req.query.page) ? limit * (req.query.page - 1) : 0
        const account = await db.Account.findOne({
            address: owner.toLowerCase()
        })

        const metadata = new grpc.Metadata()
        metadata.add('Authorization', `Bearer ${account.jwt}`)
        server.projectAPI.List({ access_token: account.jwt }, metadata, (err, response) => {
            if (err) {
                const error = grpcError.deserializeGoogleGrpcStatusDetails(err)
                if (!error) {
                    return next(new Error(error.details))
                } else {
                    return next(new Error(error.details[0].array))
                }
            }
            return res.send(response)
        })
    } catch (error) {
        return next(error)
    }
})

router.post('/new-project', [
    check('name').exists().withMessage("'name' is required"),
    // check('watchContracts').exists().withMessage("'watchContracts' is required"),
    check('owner').exists().isLength({ min: 42, max: 42 }).withMessage("'owner' is required")
], async function (req, res, next) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return next(errors.array())
    }
    try {
        const projectName = req.body.name
        const owner = (req.body.owner || '').toLowerCase()
        const account = await db.Account.findOne({
            address: owner.toLowerCase()
        })
        const metadata = new grpc.Metadata()
        metadata.add('Authorization', `Bearer ${account.jwt}`)
        server.projectAPI.Create(
            {
                name: projectName
            },
            metadata,
            async (err, response) => {
                if (err) {
                    const error = grpcError.deserializeGoogleGrpcStatusDetails(err)
                    if (!error) {
                        return next(new Error(error.details))
                    } else {
                        return next(new Error(error.details[0].array))
                    }
                }
                return res.send(response)
            }
        )
    } catch (error) {
        return next(error)
    }
})

router.post('/update-project', [
    check('id'),
    check('name').exists().withMessage("'name' is required"),
    check('newName').exists().withMessage("'newName' is required"),
    check('watchContracts').optional()
], async function (req, res, next) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return next(errors.array())
    }
    try {
        const projectName = req.body.name || ''
        const newName = req.body.newName || ''
        const watchContracts = req.body.watchContracts || []
        const owner = (req.body.owner || '').toLowerCase()
        // const id = req.body.id

        let contracts = []
        if (Array.isArray(watchContracts)) {
            contracts = [...new Set(contracts.concat(watchContracts))]
        } else {
            const array = watchContracts.replace(/\s+/g, '').split(',')

            contracts = [...new Set(contracts.concat(array))]
        }
        await db.Project.updateOne({
            owner,
            name: projectName
        }, {
            $set: {
                name: newName,
                smartContractAddresses: contracts
            }
        }, { upsert: false })

        return res.json({
            owner,
            name: newName,
            smartContractAddresses: contracts
        })
    } catch (error) {
        return next(error)
    }
})

router.post('/delete-project', [
    check('id'),
    check('owner').exists().withMessage("'owner' is required")
], async function (req, res, next) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return next(errors.array())
    }
    try {
        const owner = (req.body.owner || '').toLowerCase()
        const id = req.body.id
        const checkProject = await db.Project.findOne({
            _id: id,
            owner
        })
        if (!checkProject) {
            return next(new Error('Project does not exist'))
        }
        const result = await db.Project.deleteOne({
            _id: id,
            owner
        })
        return res.send(result)
    } catch (error) {
        return next(error)
    }
})

router.get('/getList/:address', async (req, res, next) => {
    try {
        const address = req.params.address
        const account = await db.Account.findOne({
            address: address.toLowerCase()
        })
        console.log(account)
        const metadata = new grpc.Metadata()
        metadata.add('Authorization', `Bearer ${account.jwt}`)
        server.projectAPI.List({ access_token: account.jwt }, metadata, (err, response) => {
            if (err) {
                const error = grpcError.deserializeGoogleGrpcStatusDetails(err)
                if (!error) {
                    return next(new Error(error.details))
                } else {
                    return next(new Error(error.details[0].array))
                }
            }
            console.log(response)
            return res.send(response)
        })
    } catch (error) {
        return next(error)
    }
})

module.exports = router
