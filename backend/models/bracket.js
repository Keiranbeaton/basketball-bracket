'use strict';

const Promise = require('bluebird');
const mongoose = require('mongoose');

mongoose.Promise = Promise;

let bracketSchema = mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, unique: true},
  east: {
    firstRound: {
      oneEight: {winner: String, length: Number},
      twoSeven: {winner: String, length: Number},
      threeSix: {winner: String, length: Number},
      fourFive: {winner: String, length: Number}
    },
    semis: {
      seriesOne: {winner: String, length: Number},
      seriesTwo: {winner: String, length: Number}
    },
    finals: {
      winner: String,
      length: Number
    }
  },
  west: {
    firstRound: {
      oneEight: {winner: String, length: Number},
      twoSeven: {winner: String, length: Number},
      threeSix: {winner: String, length: Number},
      fourFive: {winner: String, length: Number}
    },
    semis: {
      seriesOne: {winner: String, length: Number},
      seriesTwo: {winner: String, length: Number}
    },
    finals: {
      winner: String,
      length: Number
    }
  },
  finals: {winner: String, length: Number}
});

module.exports = exports = mongoose.model('Bracket', bracketSchema);
