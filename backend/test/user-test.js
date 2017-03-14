'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const User = require('../models/user');
const baseUrl = 'localhost:5000/api/users';
chai.use(chaiHttp);

describe('User CRUD tests', function() {
  let user;
  before(function(done) {
    user = new User({name: 'TestName3', username: 'TestUser3', password: 'AuthTest3', role: 'basic', score: 0});
    user.save().then((userData) => {
      this.user = userData;
      done();
    }, (err) => {
      throw err;
    });
  });

  it('testing GET all', function(done) {
    chai.request(baseUrl)
      .get('/')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.body.length).to.not.eql(0);
        expect(res.status).to.eql(200);
        done();
      });
  });

  it('testing GET :id', function(done) {
    chai.request(baseUrl)
      .get('/' + user._id)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.body).to.have.property('name');
        expect(res.body).to.have.property('username');
        expect(res.body).to.have.property('password');
        expect(res.body).to.have.property('role');
        expect(res.body).to.have.property('score');
        expect(res.body.name).to.eql('TestName3');
        expect(res.body.username).to.eql('TestUser3');
        expect(res.body.password).to.eql('AuthTest3');
        expect(res.body.role).to.eql('basic');
        expect(res.body.score).to.eql(0);
        expect(res.status).to.eql(200);
        done();
      });
  });

  it('testing GET bad id', function(done) {
    chai.request(baseUrl)
      .get('/badid')
      .end((err, res) => {
        expect(err).to.not.eql(null);
        expect(res.status).to.eql(404);
        expect(err.message).to.eql('Not Found');
        done();
      });
  });

  it('testing PUT', function(done) {
    chai.request(baseUrl)
      .put('/' + user._id)
      .send({name: 'NewTestName1', username: 'NewTestUser1'})
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.body.name).to.eql('NewTestName1');
        expect(res.body.username).to.eql('NewTestUser1');
        expect(res.status).to.eql(200);
        done();
      });
  });

  it('testing PUT bad id', function(done) {
    chai.request(baseUrl)
      .put('/badid')
      .send({name: 'BadIdName1'})
      .end((err, res) => {
        expect(err).to.not.eql(null);
        expect(res.status).to.eql(404);
        expect(res.text).to.eql('"User Id Not Found"');
        expect(err.message).to.eql('Not Found');
        done();
      });
  });

  it('testing DELETE', function(done) {
    chai.request(baseUrl)
      .delete('/' + user._id)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        done();
      });
  });
});
