const jwt = require('jsonwebtoken')
const logger = require('../common/logging-service')

const log = new logger('loan-auth')

const auth = async (req, res, next) => {
    try {
        log.info('Starting user authorization.')
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'thisisCDEMEANcourse')
        log.info('User authorized, user id:', decoded._id)
        req._id = decoded._id
        next()
    } catch (e) {
        log.error('Unable to authenticate user', e.message)
        res.send({status:401, message:{error: 'Please authenticate.' }})
    }
}

module.exports = auth