const jwt = require('jsonwebtoken')
const User = require('../models/user')
const logger = require('../common/logging-service')
//import * as jwt from 'jsonwebtoken'
//import * as User from '../models/user.js'
//import CustomLogger from '../logging-service.js'

const log = new logger('User-auth')

const auth = async (req, res, next) => {
    try {
        log.info('Starting user authorization.')
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'thisisCDEMEANcourse')
        log.info('User authorized, user id:', decoded._id)
        const user = await User.findOne({ _id: decoded._id, token})
        if (!user) {
            log.error('Unable to get user details.')
            throw new Error()
        }
        log.info('Seccessfully retrieved user details!')
        req.token = token
        req.user = user
        next()
    } catch (e) {
        log.error('Unable to authenticate user', e.message)
        res.send({status:401, message:{error: 'Please authenticate.' }})
    }
}

module.exports = auth