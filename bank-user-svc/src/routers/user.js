const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const logger = require('../common/logging-service')
var bodyParser = require('body-parser');
/*import express from 'express'
import * as User from '../models/user.js'
import CustomLogger from '../logging-service.js'
import {auth} from '../middleware/auth.js'*/


const router = new express.Router()

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

const log = new logger('User-router')

//register new user
router.post('/users', async (req, res) => {
    log.info('Request received for new user registration!')
    log.info(req.body)
    const user = new User(req.body)
    log.info("Received user details: ", req.body)
    try {
        await user.save()
        log.info('User details saved successfully!')
        const token = await user.generateAuthToken()
        res.send({ status: 201, message:{user, token }})
    } catch (e) {
        log.error('unable to save user details!', e.stack)
        res.send({status: 400, message:{error:'unable to register'}})
    }
})

//user login
router.post('/users/login', async (req, res) => {
    try {
        log.info('Request received for new user login!')
        const user = await User.findByCredentials(req.body.username, req.body.password)
        log.info('User found!', user)
        const token = await user.generateAuthToken()
        res.send({ status: 200, message:{ user, token }})
    } catch (e) {
        log.error('unable to login!')
        res.send({status:401, message:{error:'Unable to login!'}})
    }
})

//user logout
router.post('/users/logout', auth, async (req, res) => {
    try {
        log.info('Request received to logout user!', req.user.username)
        req.user.token = ''
        await req.user.save()
        log.info('User successfully logged out!')
        res.send({status:200, message:'You are successfully logged out!'})
    } catch (e) {
        log.error('unable to logout.', e)
        res.send({status:401, message:{error:'Unable to logout!'}})
    }
})

//get user profile details
router.get('/users/me', auth, async (req, res) => {
    try{
        log.info('Request received for user details!', req.user.username)
        res.send({status: 200, message: req.user})
    }catch(e){
        log.error('unable to retrieve user details.', e)
        res.send({status:404, message:{ error: 'unable to get user profile'}})
    }
})

//update user profile details
router.patch('/users/me', auth, async (req, res) => {

    log.info('Request received for user update!', req.body)
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'address', 'state', 'country', 'PAN', 'mobilenumber','DOB', 'accounttype']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        log.error('Invalid user update.')
        return res.send({status:400, message:{error: 'Invalid updates!' }})
    }

    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        log.info('User details successfuly updated.')
        res.send({status:200, message: req.user})
    } catch (e) {
        log.error('Unable to update user details.', e)
        res.send({status: 400, message:{ error:'Unable to update user details!'}})
    }
})


module.exports = router