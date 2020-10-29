const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const logger = require('./common/logging-service')
const port = process.env.PORT || 3001
require('./common/eureka-helper').registerWithEureka('users-service', port)
/*import express from 'express'
import './db/mongoose.js'
import * as userRouter from './routers/user.js'
import CustomLogger from './logging-service.js'*/

const log = new logger('User-startup')

const app = express()

app.use(express.json())
app.use(userRouter)


app.listen(port, () => {
    log.info('User service started on port:', port)
    console.log('Server is up on port ' + port)
})
