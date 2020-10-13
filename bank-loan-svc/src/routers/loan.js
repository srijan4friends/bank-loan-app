const express = require('express')
const Loan = require('../models/loandetails')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/loan/new', auth, async(req, res) => {
    const loan = new Loan(req.body)
    try{
        loan.owner = req._id
        await loan.save()
        res.send({status:201, message:loan})
    }catch(err){
        res.send({status: 400, message:{error: 'Unable to create new loan request!'}})
    }
})

router.get('/loan/single/:loanId', auth, async(req, res) => {
    const owner = req._id
    const loanId = req.params.loanId

    try{
        const loan = await Loan.findOne({_id: loanId, owner})
        if(!loan){
            return res.send({status:404, message:{ error:'No loan found for the owner'}})
        }
        res.send({status:200, message:loan})
    }catch(err){
        res.send({status:404, message:{ error: 'Unable to get loan details'}})
    }
})

router.get('/loan/all', auth, async(req, res) => {
    const owner = req._id
    try{
        const loan = await Loan.find({owner})
        if(!loan){
            return res.send({status:404, message:{error:'No loan found for the owner'}})
        }
        res.send({status:200, message: loan})
    }catch(err){
        res.send({status:404, message:{ error: 'Unable to find loan details'}})
    }
})

module.exports = router