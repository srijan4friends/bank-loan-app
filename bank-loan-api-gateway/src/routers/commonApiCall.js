var express = require('express');
var router = express.Router()

const simplePostCall = (api, req, res)=>{
    api.post(req.path, req.body).then(resp => {
        res.status(resp.data.status).send(resp.data.message)
      }).catch((err) => {
        res.status(400).send(err)
    })
}

const headerPostCall = (api, req, res) => {
    api.post(req.path, req.body,{
        headers: {
            Authorization: req.header('Authorization')
        }
    }).then(resp => {
        res.status(resp.data.status).send(resp.data.message)
      }).catch((err) => {
        res.status(400).send(err)
    })
}

const headerGetCall = (api, req, res) => {
    api.get(req.path,{
        headers: {
            Authorization: req.header('Authorization')
        }
    }).then(resp => {
        res.status(resp.data.status).send(resp.data.message)
      }).catch((err) => {
        res.status(400).send(err)
    })
}

const headerPatchCall = (api, req, res) => {
    api.patch(req.path, req.body,{
        headers: {
            Authorization: req.header('Authorization')
        }
    }).then(resp => {
        res.status(resp.data.status).send(resp.data.message)
      }).catch((err) => {
        res.status(400).send(err)
    })
}

module.exports = {simplePostCall, headerPostCall, headerGetCall, headerPatchCall}