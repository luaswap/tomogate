'use strict'
const express = require('express')
const router = express.Router()

router.use('/api/config', require('./config'))
router.use('/api/wrap', require('./wrap'))
router.use('/api/transactions', require('./transactions'))
router.use('/api/projects', require('./projects'))
router.use('/api/login', require('./login'))

module.exports = router
