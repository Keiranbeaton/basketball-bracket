'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const baseUrl = 'localhost:5000/api/brackets';
const Bracket = require('../models/bracket');


describe('Bracket CRUD tests', function() {
  it('POST new Bracket', function(done) {
    chai.request(baseUrl)
      .post('/')
      .send({userId: 'TestUserId1', east: {firstRound: {oneEight: {winner: 'TestWinner1E18', length: 4}, twoSeven: {winner: 'TestWinner1E27', length: 5}, threeSix: {winner: 'TestWinner1E36', length: 6}, fourFive: {winner: 'TestWinner1E45', length: 7}}, semis: {seriesOne: {winner: 'TestWinnerSemisE1', length: 4}, seriesTwo: {winner: 'TestWinnerSemisE2', length: 5}}, finals:{winner: 'TestWinner1EFinals', length: 7}}, west:{firstRound:{oneEight: {winner: 'TestWinner1W18', length: 4}, twoSeven: {winner: 'TestWinner1W27', length: 5}, threeSix: {winner: 'TestWinner1W36', length: 6}, fourFive: {winner: 'TestWinner1W45', length: 7}}, semis: {seriesOne: {winner: 'TestWinnerSemis1W1', length: 4}, seriesTwo: {winner: 'TestWinnerSemis1W2', length: 5}}, finals:{winner: 'TestWinner1WFinals', length: 7}}, finals:{winner:'TestNBAChamp', length: 4}})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body).to.have.property('userId');
        expect(res.body).to.have.property('east');
        expect(res.body).to.have.property('west');
        expect(res.body).to.have.property('finals');
        done();
      });
  });
});
