var express = require('express');
var router = express.Router()
var userRouter = require('./userRouter')
var loanRouter = require('./loanRouter')
var logger = require('../logging-service')

var log = new logger('Api-gateway-router')

router.use((req, res, next) => {
    log.info("Path: ", req.path)
    log.info('Method: ', req.method)
    next()
})

router.use(userRouter)
router.use(loanRouter)

module.exports = router