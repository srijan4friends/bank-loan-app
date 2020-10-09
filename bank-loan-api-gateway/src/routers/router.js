var express = require('express');
var router = express.Router()
var userRouter = require('./userRouter')
var loanRouter = require('./loanRouter')

router.use((req, res, next) => {
    console.log("Called: ", req.path)
    next()
})

router.use(userRouter)
router.use(loanRouter)

module.exports = router