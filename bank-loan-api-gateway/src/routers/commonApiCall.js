var express = require('express');
var router = express.Router()

const simplePostCall = (api, req, res)=>{
    api.post(req.path, req.body).then(resp => {
        res.send(resp.data)
      }).catch((err) => {
        res.send(err)
    })
}

const headerPostCall = (api, req, res) => {
    console.log('here')
    api.post(req.path, req.body,{
        headers: {
            Authorization: req.header('Authorization')
        }
    }).then(resp => {
        res.send(resp.data)
      }).catch((err) => {
        res.send(err)
    })
}

const headerGetCall = (api, req, res) => {
    console.log(req.body)
    api.get(req.path,{
        headers: {
            Authorization: req.header('Authorization')
        }
    }).then(resp => {
        res.send(resp.data)
      }).catch((err) => {
        res.send(err)
    })
}

const headerPatchCall = (api, req, res) => {
    api.patch(req.path, req.body,{
        headers: {
            Authorization: req.header('Authorization')
        }
    }).then(resp => {
        res.send(resp.data)
      }).catch((err) => {
        res.send(err)
    })
}

module.exports = {simplePostCall, headerPostCall, headerGetCall, headerPatchCall}