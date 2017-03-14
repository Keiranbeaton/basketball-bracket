'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const baseUrl = 'localhost:5000/api';
const User = require('../models/user');

describe('Auth testing', function() {
  it('POST new user', function(done) {
    chai.request(baseUrl)
      .post('/signup')
      .send({name: 'TestName1', username: 'TestUser1', password: 'AuthTest1', role: 'basic', score: 0})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body).to.have.property('token');
        expect(res.body.token.length).to.not.eql(0);
        done();
      });
  });

  describe('with User in Database', function() {
    before(function(done) {
      let user = new User({name: 'TestName2', username: 'TestUser2', password: 'AuthTest2', role: 'basic', score: 0});
      user.generateHash(user.password).then((token) => {
        console.log('Got through user.generateHash');
        this.tokenData = token;
        user.save().then((userData) => {
          console.log('Got through user.save');
          this.user = userData;
        });
      });
      done();
    });

    it('Authenticating Existing User', function(done) {
      chai.request(baseUrl)
      .get('/signin')
      .auth('TestUser2', 'AuthTest2')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.body).to.have.property('token');
        expect(res.body.token.length).to.not.eql(0);
        done();
      });
    });

    it('Authenticating Bad Credentials', function(done) {
      chai.request(baseUrl)
        .get('/signin')
        .auth('bad', 'credentials')
        .end((err, res) => {
          expect(err).to.not.eql(null);
          expect(res.status).to.eql(404);
          expect(res.text).to.eql('"User not found"');
          done();
        });
    });

    it('Authenticating with Token', function(done) {
      chai.request(baseUrl)
        .get('/jwtAuth')
        .set('Authorization', 'Bearer ' + this.tokenData.token)
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res.status).to.eql(200);
          done();
        });
    });

    it('Authenticating without Token', function(done) {
      chai.request(baseUrl)
        .get('/jwtAuth')
        .end((err, res) => {
          expect(err).to.not.eql(null);
          expect(err.message).to.eql('Internal Server Error');
          expect(res.status).to.eql(500);
          done();
        });
    });
  });
});
