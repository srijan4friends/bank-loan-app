var express = require('express');
var router = express.Router();
var commonApiCall = require('./commonApiCall')

const apiAdapter = require('./apiAdapter')

const BASE_URL = 'http://localhost:3001'
const api = apiAdapter(BASE_URL)


router.post('/users', (req, res) => {
    commonApiCall.simplePostCall(api, req, res)
})

router.post('/users/login', (req, res) => {
    commonApiCall.simplePostCall(api,req, res)
})

router.post('/users/logout', (req, res) => {
    commonApiCall.headerPostCall(api,req, res)
})


router.get('/users/me', (req, res) => {
    commonApiCall.headerGetCall(api,req, res)
})

router.patch('/users/me', (req, res) => {
    commonApiCall.headerPatchCall(api,req, res)
})


module.exports = router