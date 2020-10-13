const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()

//register new user
router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.send({ status: 201, message:{user, token }})
    } catch (e) {
        res.send({status: 400, message:{error:'unable to register'}})
    }
})

//user login
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.username, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ status: 200, message:{ user, token }})
    } catch (e) {
        res.send({status:401, message:{error:'Unable to login!'}})
    }
})

//user logout
router.post('/users/logout', auth, async (req, res) => {
    try {
        /*req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })*/
        req.user.token = ''
        await req.user.save()

        res.send({status:200, message:'You are successfully logged out!'})
    } catch (e) {
        res.send({status:401, message:{error:'Unable to logout!'}})
    }
})

//get user profile details
router.get('/users/me', auth, async (req, res) => {
    try{
        res.send({status: 200, message: req.user})
    }catch(e){
        res.send({status:404, message:{ error: 'unable to get user profile'}})
    }
})

//update user profile details
router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'address', 'state', 'country', 'PAN', 'mobilenumber','DOB', 'accounttype']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.send({status:400, message:{error: 'Invalid updates!' }})
    }

    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send({status:200, message: req.user})
    } catch (e) {
        res.send({status: 400, message:{ error:'Unable to update user details!'}})
    }
})


module.exports = router