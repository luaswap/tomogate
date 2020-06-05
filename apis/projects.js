'use strict'
const express = require('express')
const router = express.Router()
const db = require('../models/mongodb')
// const config = require('config')
// const urljoin = require('url-join')
// const axios = require('axios')
const { check, validationResult, query } = require('express-validator/check')

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
        let limit = (req.query.limit) ? parseInt(req.query.limit) : 100
        let skip = (req.query.page) ? limit * (req.query.page - 1) : 0
        const total = db.Project.countDocuments({
            owner
        })
        let query = { owner }
        if (req.query.id) {
            query._id = req.query.id
            skip = 0
            limit = 0
        }
        const data = await db.Project.find(query).limit(limit).skip(skip).lean().exec()

        return res.json({
            items: data,
            total: await total
        })
    } catch (error) {
        return next(error)
    }
})

router.post('/new-project', [
    check('name').exists().withMessage("'name' is required"),
    check('watchContracts').exists().withMessage("'watchContracts' is required"),
    check('owner').exists().isLength({ min: 42, max: 42 }).withMessage("'owner' is required")
], async function (req, res, next) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return next(errors.array())
    }
    try {
        const projectName = req.body.name
        const watchContracts = req.body.watchContracts
        const owner = (req.body.owner || '').toLowerCase()
        const checkProject = await db.Project.findOne({
            owner,
            name: projectName
        })
        if (checkProject) {
            return next(new Error('Project name is already existed'))
        }
        let contracts = []
        if (Array.isArray(watchContracts)) {
            contracts = [...new Set(watchContracts)]
        } else {
            const array = watchContracts.replace(/\s+/g, '').split(',')

            contracts = [...new Set(array)]
        }
        const result = await db.Project.updateOne({
            owner,
            name: projectName
        }, {
            owner,
            name: projectName,
            smartContractAddresses: contracts,
            status: true
        }, { upsert: true })

        return res.json({
            id: result.upserted[0]._id,
            owner,
            name: projectName,
            smartContractAddresses: contracts,
            status: true
        })
    } catch (error) {
        return next(error)
    }
})

router.post('/update-project', [
    check('id'),
    check('name').exists().withMessage("'name' is required"),
    check('watchContracts').exists().withMessage("'watchContracts' is required")
], async function (req, res, next) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return next(errors.array())
    }
    try {
        const projectName = req.body.name
        const watchContracts = req.body.watchContracts
        const owner = (req.body.owner || '').toLowerCase()
        const id = req.body.id

        let contracts = []
        if (Array.isArray(watchContracts)) {
            contracts = [...new Set(contracts.concat(watchContracts))]
        } else {
            const array = watchContracts.replace(/\s+/g, '').split(',')

            contracts = [...new Set(contracts.concat(array))]
        }
        await db.Project.updateOne({
            _id: id,
            owner,
            name: projectName
        }, {
            owner,
            name: projectName,
            smartContractAddresses: contracts
        }, { upsert: false })

        return res.json({
            owner,
            name: projectName,
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

module.exports = router
