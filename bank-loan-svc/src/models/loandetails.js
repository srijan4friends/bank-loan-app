const mongoose = require('mongoose')
const validator = require('validator')

const loanDetailsSchema = new mongoose.Schema({
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    loanType: {
        type: String,
        required: true,
        trim: true,     
    },
    loanAmt: {
        type: Number,
        required: true,
        validate(value){
            if(value <= 0){
                throw new Error("Enter correct loan ammount!")
            }
        }
    },
    loanDate: {
        type: Date,
        required: true,
        trim: true,
        /*validate(value){
            if(!validator.isAfter(value)){
                throw new Error("Enter current or future date(mm-dd-yyyy)!")
            }
        }*/
    },
    roi: {
        type: Number,
        required: true,validate(value){
            if(value <= 0){
                throw new Error("Enter correct rate of interest!")
            }
        }
    },
    duration: {
        type: Number,
        required: true,
        validate(value){
            if(value <= 0){
                throw new Error("Enter correct duration!")
            }
        }
    },
    installmentAmt: {
        type: Number,
        required: false
    }
})

loanDetailsSchema.pre('save', async function(next){
    const loanDetails = this
    const mroi = this.roi/(12*100)
    const totMonthlyInst = this.duration*12
    const part1 = ((1+mroi)^totMonthlyInst)/(((1+mroi)^totMonthlyInst)-1)
    this.installmentAmt = this.loanAmt * mroi * part1
    next()
})

const Loan = mongoose.model('Loan', loanDetailsSchema)

module.exports = Loan