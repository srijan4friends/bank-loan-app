const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'thisisCDEMEANcourse')
        const user = await User.findOne({ _id: decoded._id, token})

        if (!user) {
            throw new Error()
        }

        req.token = token
        req.user = user
        next()
    } catch (e) {
        res.send({status:401, message:{error: 'Please authenticate.' }})
    }
}

module.exports = auth