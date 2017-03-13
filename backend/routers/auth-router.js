'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const createError = require('http-errors');
const User = require('../models/user');
const BasicHTTP = require('../lib/basic-http');
const authzn = require('../lib/authorization');
const jwtAuth = require('../lib/jwt-auth');
const ErrorHandler = require('../lib/error-handler');
const debug = require('debug')('authRouter');

let authRouter = module.exports = exports = Router();

authRouter.post('/signup', jsonParser, (req, res, next) => {
  debug('POST api/signup');
  let newUser = new User();
  newUser.name = req.body.name;
  newUser.username = req.body.username;
  newUser.password.role = 'basic';
  newUser.score = 0;
  newUser.generateHas(req.body.password)
    .then((tokenData) => {
      newUser.save().then(() => {
        res.json(tokenData);
      }, ErrorHandler(400, next, 'Bad Request'));
    }, ErrorHandler(500, next));
});

authRouter.get('/signin', BasicHTTP, (req, res, next) => {
  debug('GET /api/signin');
  User.findOne({'username': req.auth.username})
    .then((user) => {
      if (!user) return next(createError(404, 'User not found'));
      user.comparePassword(req.auth.password)
        .then((tokenData) => {
          tokenData.userId = user._id;
          res.json(tokenData);
        }, ErrorHandler(401, next, 'Authentication Failed'));
    }, ErrorHandler(401, next, 'Authentication Failed'));
});

authRouter.put('/addrole/:userid', jsonParser, jwtAuth, authzn('admin'), (req, res, next) => {
  User.update({_id: req.params.userid}, {$set: {role: req.body.role}}).then(res.json.bind(res)), next(createError(500, 'Server Error'));
});
