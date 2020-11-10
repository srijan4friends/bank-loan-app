const express = require('express')
require('./db/mongoose')
const loanRouter = require('./routers/loan')
const logger = require('./common/logging-service')

const log = new logger('loan-startup')
const port = process.env.PORT || 3002
require('./common/eureka-helper').registerWithEureka('loan-service', port)

const app = express()

app.use(express.json())
app.use('/v1',loanRouter)

app.listen(port, () => {
    log.info('User service started on port:', port)
    console.log('Server is up on port ' + port)
})
