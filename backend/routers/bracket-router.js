'use strict';

const Router = require('express').Router;
const createError = require('http-errors');
const jsonParser = require('body-parser').json();
const debug = require('debug')('bracketRouter');

const Bracket = require('../models/bracket');
const User = require('../models/user');

let bracketRouter = module.exports = exports = new Router();

bracketRouter.post('/', jsonParser, (req, res, next) => {
  debug('POST /api/brackets');
  let data = req.body;
  console.log('req.body', req.body);
  User.findById(data.userId)
    .then((user) => {
      console.log('user', user);
      user.addBracket(req.body)
        .then((bracket) => {
          res.json(bracket);
        }).catch(next);
    }).catch(err => next(createError(400, err.message)));
});

bracketRouter.get('/', (req, res, next) => {
  debug('GET /api/brackets');
  Bracket.find().then((bracket) => {
    res.send(bracket);
  }).catch(next);
});

bracketRouter.get('/:id', (req, res, next) => {
  debug('GET /api/brackets/:id');
  Bracket.findById(req.params.id)
    .then((bracket) => {
      res.send(bracket);
    }).catch((err) => {
      next(createError(404, err.message));
    });
});

bracketRouter.put('/:id', jsonParser, (req, res, next) => {
  Bracket.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then((bracket) => {
      res.send(bracket);
    }).catch((err) => {
      next(createError(404, err.message));
    });
});

bracketRouter.delete('/:id', (req, res, next) => {
  debug('DELETE /api/brackets/:id');
  Bracket.findByIdAndRemove(req.params.id)
    .then((bracket) => {
      res.json(bracket);
    }).catch(next);
});
