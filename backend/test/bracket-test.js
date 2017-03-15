'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const baseUrl = 'localhost:5000/api/brackets';
const Bracket = require('../models/bracket');
const User = require('../models/user');


describe('Bracket CRUD tests', function() {
  let user;
  let userTwo;
  let testBracket;
  before(function(done) {
    user = new User({name:'BracketTestName1', username: 'BracketTestUser1', password: 'BracketTest1', role: 'basic', score: 0});
    user.save().then((userData) => {
      this.user = userData;
    }, (err) => {
      throw err;
    });
    userTwo = new User({name:'BracketTestName2', username: 'BracketTestUser2', password: 'BracketTest2', role: 'basic', score: 0});
    userTwo.save().then((userData) => {
      this.userTwo = userData;
    }, (err) => {
      throw err;
    });
    testBracket = new Bracket({userId: user._id, east: {firstRound: {oneEight: {winner: 'TestWinner1E18', length: 4}, twoSeven: {winner: 'TestWinner1E27', length: 5}, threeSix: {winner: 'TestWinner1E36', length: 6}, fourFive: {winner: 'TestWinner1E45', length: 7}}, semis: {seriesOne: {winner: 'TestWinnerSemis1E1', length: 4}, seriesTwo: {winner: 'TestWinnerSemis1E2', length: 5}}, finals:{winner: 'TestWinner1EFinals', length: 7}}, west:{firstRound:{oneEight: {winner: 'TestWinner1W18', length: 4}, twoSeven: {winner: 'TestWinner1W27', length: 5}, threeSix: {winner: 'TestWinner1W36', length: 6}, fourFive: {winner: 'TestWinner1W45', length: 7}}, semis: {seriesOne: {winner: 'TestWinnerSemis1W1', length: 4}, seriesTwo: {winner: 'TestWinnerSemis1W2', length: 5}}, finals:{winner: 'TestWinner1WFinals', length: 7}}, finals:{winner:'Test1NBAChamp', length: 4}});
    testBracket.save().then((bracketData) => {
      this.testBracket = bracketData;
      done();
    }, (err) => {
      throw err;
    });
  });

  it('POST new Bracket', function(done) {
    chai.request(baseUrl)
      .post('/')
      .send({userId: userTwo._id, east: {firstRound: {oneEight: {winner: 'TestWinner2E18', length: 4}, twoSeven: {winner: 'TestWinner2E27', length: 5}, threeSix: {winner: 'TestWinner2E36', length: 6}, fourFive: {winner: 'TestWinner2E45', length: 7}}, semis: {seriesOne: {winner: 'TestWinnerSemis2E1', length: 4}, seriesTwo: {winner: 'TestWinnerSemis2E2', length: 5}}, finals:{winner: 'TestWinner2EFinals', length: 7}}, west:{firstRound:{oneEight: {winner: 'TestWinner2W18', length: 4}, twoSeven: {winner: 'TestWinner2W27', length: 5}, threeSix: {winner: 'TestWinner2W36', length: 6}, fourFive: {winner: 'TestWinner2W45', length: 7}}, semis: {seriesOne: {winner: 'TestWinnerSemis2W1', length: 4}, seriesTwo: {winner: 'TestWinnerSemis2W2', length: 5}}, finals:{winner: 'TestWinner2WFinals', length: 7}}, finals:{winner:'Test2NBAChamp', length: 4}})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body).to.have.property('userId');
        expect(res.body).to.have.property('east');
        expect(res.body).to.have.property('west');
        expect(res.body).to.have.property('finals');
        expect(res.body.east).to.have.property('firstRound');
        expect(res.body.east).to.have.property('semis');
        expect(res.body.east).to.have.property('finals');
        expect(res.body.west).to.have.property('firstRound');
        expect(res.body.west).to.have.property('semis');
        expect(res.body.west).to.have.property('finals');
        expect(res.body.east.firstRound.oneEight.winner).to.eql('TestWinner2E18');
        expect(res.body.finals.winner).to.eql('Test2NBAChamp');
        done();
      });
  });

  it('GET all brackets', function(done) {
    chai.request(baseUrl)
      .get('/')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.body.length).to.not.eql(0);
        expect(res.status).to.eql(200);
        done();
      });
  });

  it('GET bracket by :id', function(done) {
    chai.request(baseUrl)
      .get('/' + testBracket._id)
      .end((err, res) => {
        expect(res.body).to.have.property('userId');
        expect(res.body).to.have.property('east');
        expect(res.body).to.have.property('west');
        expect(res.body).to.have.property('finals');
        expect(res.body.east).to.have.property('firstRound');
        expect(res.body.east).to.have.property('semis');
        expect(res.body.east).to.have.property('finals');
        expect(res.body.west).to.have.property('firstRound');
        expect(res.body.west).to.have.property('semis');
        expect(res.body.west).to.have.property('finals');
        expect(res.body.east.firstRound.oneEight.winner).to.eql('TestWinner1E18');
        expect(res.body.east.firstRound.twoSeven.winner).to.eql('TestWinner1E27');
        expect(res.body.east.semis.seriesOne.length).to.eql(4);
        expect(res.body.finals.winner).to.eql('Test1NBAChamp');
        done();
      });
  });

  it('GET bad id', function(done) {
    chai.request(baseUrl)
      .get('/badid')
      .end((err, res) => {
        expect(err).to.not.eql(null);
        expect(res.status).to.eql(404);
        expect(err.message).to.eql('Not Found');
        done();
      });
  });

  it('PUT bracket', function(done) {
    chai.request(baseUrl)
      .put('/' + testBracket._id)
      .send({finals: {winner: 'NewFinalsWinner', length: 5}})
      .end((err, res) => {
        expect(res.body).to.have.property('east');
        expect(res.body).to.have.property('west');
        expect(res.body).to.have.property('finals');
        expect(res.body.east).to.have.property('firstRound');
        expect(res.body.east).to.have.property('semis');
        expect(res.body.east).to.have.property('finals');
        expect(res.body.west).to.have.property('firstRound');
        expect(res.body.west).to.have.property('semis');
        expect(res.body.west).to.have.property('finals');
        expect(res.body.east.firstRound).to.have.property('oneEight');
        expect(res.body.east.firstRound).to.have.property('twoSeven');
        expect(res.body.east.firstRound).to.have.property('threeSix');
        expect(res.body.east.firstRound).to.have.property('fourFive');
        expect(res.body.east.firstRound.oneEight).to.have.property('winner');
        expect(res.body.east.firstRound.oneEight).to.have.property('length');
        expect(res.body.east.firstRound.oneEight.winner).to.eql('TestWinner1E18');
        expect(res.body.east.firstRound.oneEight.length).to.eql(4);
        expect(res.body.finals).to.have.property('winner');
        expect(res.body.finals).to.have.property('length');
        expect(res.body.finals.winner).to.eql('NewFinalsWinner');
        expect(res.body.finals.length).to.eql(5);
        done();
      });
  });

  it('PUT with bad id', function(done) {
    chai.request(baseUrl)
      .put('/badid')
      .send({finals:{winner: 'shouldNotWork', length: 5}})
      .end((err, res) => {
        expect(err).to.not.eql(null);
        expect(res.status).to.eql(404);
        expect(err.message).to.eql('Not Found');
        done();
      });
  });

  it('Delete bracket', function(done) {
    chai.request(baseUrl)
      .delete('/' + testBracket._id)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        done();
      });
  });
});
