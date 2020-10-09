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
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
})

//user login
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.username, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.status(400).send()
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

        res.send('You are successfully logged out!')
    } catch (e) {
        res.status(500).send()
    }
})

//get user profile details
router.get('/users/me', auth, async (req, res) => {
    try{
        res.send(req.user)
    }catch(e){
        res.status(400).send()
    }
})

//update user profile details
router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'address', 'state', 'country', 'PAN', 'mobilenumber','DOB', 'accounttype']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        console.log('here')
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})

//delete user profile
router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove()
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router