let mongoose = require('mongoose');
let User = require('../src/models/user');
 
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../src/routers/user');
let should = chai.should();
let expect = chai.expect;
 
chai.use(chaiHttp);

let login_details = {
    "username": "batman9",
    "password": "Joker15566"
}

describe('test user functions', () => {
    it('should let user login',async(done)=>{
       const response = await chai.request(server)
            .post('/users/login')
            .set('content-type', 'application/json')
            .send(login_details)
            .then((err, resp)=>{
                console.log('resp: '+JSON.stringify(resp))
                expect(resp.body.status).should.equals(200)
                //done()
            }).catch((err)=>{
                expect(err).to.be.an.instanceOf(Error)
                done(err)
            })
            //expect(response).to.have.status(201);
            
            //console.log('resp: '+JSON.stringify(resp))
            //expect(resp.body.status).should.equals(200)
            /*.then((err, res)=>{
                res.should.have.status(200);
                res.body.should.have.property('token');
                done()
            }).catch((err)=>{
                done(err)
            })*/
    })
})