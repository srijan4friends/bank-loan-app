const express = require('express')
const Loan = require('../models/loandetails')
const auth = require('../middleware/auth')
const router = new express.Router()
const logger = require('../common/logging-service')

const log = new logger('loan-router')

router.post('/loan/new', auth, async(req, res) => {
    log.info('Request received for new loan application', req.body)
    log.info('Application owner:', req._id)
    const loan = new Loan(req.body)
    try{
        loan.owner = req._id
        await loan.save()
        log.info('loan details saved in DB successfully!')
        res.send({status:201, message:loan})
    }catch(err){
        log.error('Unable to save loan application', err)
        res.send({status: 400, message:{error: 'Unable to create new loan request!'}})
    }
})

router.get('/loan/single/:loanId', auth, async(req, res) => {
    log.info('Request received for retrieving single loan request', req.params.loanId)
    log.info('Application owner:', req._id)
    const owner = req._id
    const loanId = req.params.loanId

    try{
        const loan = await Loan.findOne({_id: loanId, owner})
        if(!loan){
            log.error('Unable to find loan details.')
            return res.send({status:404, message:{ error:'No loan found for the owner'}})
        }
        log.info('Loan details retrived successfully.',loan)
        res.send({status:200, message:loan})
    }catch(err){
        loan.error('Unable to retrieve single loan application', err)
        res.send({status:404, message:{ error: 'Unable to get loan details'}})
    }
})

router.get('/loan/all', auth, async(req, res) => {
    log.info('Request received for retrieving all loan request')
    log.info('Application owner:', req._id)
    const owner = req._id
    try{
        const loan = await Loan.find({owner})
        if(!loan){
            log.error('Unable to find loan details.')
            return res.send({status:404, message:{error:'No loan found for the owner'}})
        }
        log.info('All loan details retrived successfully.',loan)
        res.send({status:200, message: loan})
    }catch(err){
        loan.error('Unable to retrieve any loan application', err)
        res.send({status:404, message:{ error: 'Unable to find loan details'}})
    }
})

module.exports = router