'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Bracket = require('./bracket');
const createError = require('http-errors');

let userSchema = mongoose.Schema({
  name: {type: String, required: true},
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  role: {type: String, default: 'basic'},
  score: Number,
  bracket: {type: mongoose.Schema.Types.ObjectId, ref: 'Bracket'}
});

userSchema.methods.generateHash = function(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 8, (err, data) => {
      if (err) return reject(err);
      this.password = data;
      resolve({token: jwt.sign({username: this.username, userId: this._id}, process.env.APP_SECRET)});
    });
  });
};

userSchema.methods.comparePassword = function(password) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, this.password, (err, data) => {
      if (err) return reject(err);
      if (data === false) return reject(new Error('Password did not match'));
      resolve({token: jwt.sign({username: this.username, userId: this._id}, process.env.APP_SECRET)});
    });
  });
};

userSchema.methods.addBracket = function(data) {
  let result;
  return new Promise((resolve, reject) => {
    if (this.bracket) return reject(createError(400, 'A bracket already exists for this user'));
    new Bracket(data).save().then(bracket => {
      result = bracket;
      this.bracket = bracket._id;
      return this.save();
    }).then(() => resolve(result)).catch(reject);
  });
};

module.exports = exports = mongoose.model('User', userSchema);
