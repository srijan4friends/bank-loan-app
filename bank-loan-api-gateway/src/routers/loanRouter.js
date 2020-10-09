var express = require('express');
var router = express.Router();
var commonApiCall = require('./commonApiCall')

const apiAdapter = require('./apiAdapter')

const BASE_URL = 'http://localhost:3002'
const api = apiAdapter(BASE_URL)

router.post('/loan/new', (req, res) => {
    commonApiCall.headerPostCall(api, req, res)
})

router.get('/loan/single', (req, res) => {
    commonApiCall.headerGetCall(api, req, res)
})

router.get('/loan/all', (req, res) => {
    commonApiCall.headerGetCall(api, req, res)
})

module.exports = router