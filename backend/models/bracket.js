'use strict';

const Promise = require('bluebird');
const mongoose = require('mongoose');

mongoose.Promise = Promise;

let bracketSchema = mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, unique: true},
  seriesOne: {id: Number, winner: String, length: Number},
  seriesTwo: {id: Number, winner: String, length: Number},
  seriesThree: {id: Number, winner: String, length: Number},
  seriesFour: {id: Number, winner: String, length: Number},
  seriesFive: {id: Number, winner: String, length: Number},
  seriesSix: {id: Number, winner: String, length: Number},
  seriesSeven: {id: Number, winner: String, length: Number},
  seriesEight: {id: Number, winner: String, length: Number},
  seriesNine: {id: Number, winner: String, length: Number},
  seriesTen: {id: Number, winner: String, length: Number},
  seriesEleven: {id: Number, winner: String, length: Number},
  seriesTwelve: {id: Number, winner: String, length: Number},
  seriesThirteen: {id: Number, winner: String, length: Number},
  seriesFourteen: {id: Number, winner: String, length: Number},
  seriesFifteen: {id: Number, winner: String, length: Number},
});

module.exports = exports = mongoose.model('Bracket', bracketSchema);
