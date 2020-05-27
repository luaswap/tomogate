'use strict'
const express = require('express')
const router = express.Router()
const db = require('../models/mongodb')
// const config = require('config')
// const urljoin = require('url-join')
// const axios = require('axios')
const { check, validationResult } = require('express-validator/check')

router.post('new-project', [
    check('name').exists().withMessage("'name' is required"),
    check('watchContracts').exists().withMessage("'watchContracts' is required"),
    check('owner').exists().withMessage("'owner' is required")
], async function (req, res, next) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return next(errors.array())
    }
    try {
        const projectName = req.body.name
        const smartContractAddresses = req.body.watchContracts
        const owner = req.body.owner
        const checkProject = await db.Project.findOne({
            owner,
            name: projectName
        })
        if (checkProject) {
            return next(new Error('Project name is already created'))
        }
        await db.Project.updateOne({
            owner,
            name: projectName
        }, {
            owner,
            name: projectName,
            smartContractAddresses: smartContractAddresses
        }, { upsert: true })
    } catch (error) {
        return next(error)
    }
})

router.post('add-contract', [
    check('name').exists().withMessage("'name' is required"),
    check('watchContracts').exists().withMessage("'watchContracts' is required")
], async function (req, res, next) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return next(errors.array())
    }
    try {
        const projectName = req.body.name
        const smartContractAddresses = req.body.watchContracts
        const owner = req.body.owner
        const checkProject = await db.Project.findOne({
            owner,
            name: projectName
        })
        if (!checkProject) {
            return next(new Error('Project name does not exist'))
        }
        await db.Project.updateOne({
            owner,
            name: projectName
        }, {
            owner,
            name: projectName,
            smartContractAddresses: smartContractAddresses
        }, { upsert: false })
    } catch (error) {
        return next(error)
    }
})

router.post('delete-project', [
    check('name').exists().withMessage("'name' is required"),
    check('owner').exists().withMessage("'owner' is required")
], async function (req, res, next) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return next(errors.array())
    }
    try {
        const projectName = req.body.name
        const owner = req.body.owner
        const checkProject = await db.Project.findOne({
            owner,
            name: projectName
        })
        if (!checkProject) {
            return next(new Error('Project name does not exist'))
        }
        await db.Project.deleteOne({
            owner,
            name: projectName
        })
    } catch (error) {
        return next(error)
    }
})

module.exports = router
