var express = require('express');
var app = express();
var router = require('./routers/router')
var bodyParser = require('body-parser');
const logger = require('./logging-service')

const log = new logger('Api-gateway-startup')

const port = process.env.PORT || 3000
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send("Simple API Gateway")
})

app.use(router)

app.listen(port, () => {
    log.info('Api gateway started on port:', port)
    console.log('Api gateway is up on port ' + port)
})