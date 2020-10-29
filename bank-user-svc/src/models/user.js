const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const logger = require('../common/logging-service')

/*import mongoose from 'mongoose'
import validator from 'validator'
import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
import CustomLogger from '../logging-service.js'*/

const log = new logger('User-model')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                log.error('Invalid email.', value)
                throw new Error('Email is invalid')
            }
        }
    },
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        validate(value) {
            if(!validator.isAlphanumeric(value)){
                log.error('Invalid username.', value)
                throw new Error('Username should contain only letters and numbers!')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                log.error('Password cannot contain "password"')
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    state: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if(!validator.isAlpha(value)){
                log.error('Invalid state.', value)
                throw new Error('Invalid State!')
            }
        }
    },
    country: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if(!validator.isAlpha(value)){
                log.error('Invalid country.', value)
                throw new Error('Invalid country!')
            }
        }
    },
    PAN: {
        type: String,
        unique: true,
        required: true,
        maxlength: 10,
        minlength:10,
        trim: true,
        validate(value) {
            if(!validator.isAlphanumeric(value)){
                log.error('Invalid PAN number.', value)
                throw new Error('Invalid PAN number')
            }
        }
    },
    mobilenumber: {
        type: Number,
        unique: true,
        required: true,
        maxlength: 10,
        minlength:10,
        trim: true
    },
    DOB: {
        type: Date,
        required: true,
        trim: true
    },
    accounttype: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if(!validator.isAlpha(value)){
                log.error('Invalid account type.', value)
                throw new Error('Invalid account type!')
            }
        }
    },
    token: {
        type: String,
        required: false
    }
})

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    //delete userObject.tokens
    delete userObject.token

    return userObject
}

userSchema.methods.generateAuthToken = async function () {
    log.info('generateAuthToken: Generating jwt token!')
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'thisisCDEMEANcourse',{expiresIn: '1801s'})
    log.info('User token created successfully.')
    user.token = token
    await user.save()
    log.info('User token saved in DB successfully.')

    return token
}

userSchema.statics.findByCredentials = async (username, password) => {
    log.info('findByCredentials: Find user details.',username)
    const user = await User.findOne({ username })

    if (!user) {
        log.error('Unable to get user details for login')
        throw new Error('Unable to login')
    }
    log.info('findByCredentials: Retrieved user details.',username)
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        log.error('Password mismatch!')
        throw new Error('Unable to login')
    }

    log.info('findByCredentials: Credentials matched.',username)
    return user
}

// Hash the plain text password before saving
userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

// Delete user tasks when user is removed
/*userSchema.pre('remove', async function (next) {
    const user = this
    await Task.deleteMany({ owner: user._id })
    next()
})*/

const User = mongoose.model('User', userSchema)

module.exports = User