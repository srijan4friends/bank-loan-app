var express = require('express');
var router = express.Router()

const simplePostCall = (api, req, res)=>{
    api.post(req.path, req.body).then(resp => {
        res.send(resp.data)
      }).catch((err) => {
        res.send(err.message)
    })
}

const headerPostCall = (api, req, res) => {
    console.log('here')
    api.post(req.path, {
        headers: {
            Authorization: req.header('Authorization')
        }
    }).then(resp => {
        res.send(resp.data)
      }).catch((err) => {
        res.send(err.message)
    })
}

const headerGetCall = (api, req, res) => {
    api.get(req.path, {
        headers: {
            Authorization: req.header('Authorization')
        }
    }).then(resp => {
        res.send(resp.data)
      }).catch((err) => {
        res.send(err.message)
    })
}

const headerPatchCall = (api, req, res) => {
    api.patch(req.path, {
        headers: {
            Authorization: req.header('Authorization')
        }
    }).then(resp => {
        res.send(resp.data)
      }).catch((err) => {
        res.send(err.message)
    })
}

module.exports = {simplePostCall, headerPostCall, headerGetCall, headerPatchCall}