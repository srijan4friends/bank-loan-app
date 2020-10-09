const express = require('express')
require('./db/mongoose')
const loanRouter = require('./routers/loan')

const app = express()
const port = process.env.PORT || 3002

app.use(express.json())
app.use(loanRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
