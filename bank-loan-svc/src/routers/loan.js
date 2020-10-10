const express = require('express')
const Loan = require('../models/loandetails')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/loan/new', auth, async(req, res) => {
    const loan = new Loan(req.body)
    try{
        loan.owner = req._id
        await loan.save()
        res.status(201).send({loan})
    }catch(err){
        res.send({error: 'Unable to create new loan request!'})
    }
})

router.get('/loan/single/:loanId', auth, async(req, res) => {
    const owner = req._id
    const loanId = req.params.loanId

    try{
        const loan = await Loan.findOne({_id: loanId, owner})
        if(!loan){
            return res.send('No loan found for the owner')
        }
        res.send(loan)
    }catch(err){
        res.send({error: 'Unable to find loan details'})
    }
})

router.get('/loan/all', auth, async(req, res) => {
    const owner = req._id
    try{
        const loan = await Loan.find({owner})
        if(!loan){
            return res.status(400).send('No loan found for the owner')
        }
        res.send(loan)
    }catch(err){
        res.send({error: 'Unable to find loan details'})
    }
})

module.exports = router