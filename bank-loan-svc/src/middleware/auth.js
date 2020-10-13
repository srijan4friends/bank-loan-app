const jwt = require('jsonwebtoken')
//const User = require('../models/user')

const auth = async (req, res, next) => {
    try {
        console.log(req.header('Authorization'))
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'thisisCDEMEANcourse')
        req._id = decoded._id
        next()
    } catch (e) {
        console.log(e)
        res.send({status:401, message:{error: 'Please authenticate.' }})
    }
}

module.exports = auth