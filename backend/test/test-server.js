'use strict';

const app = require('express')();
const mongoose = require('mongoose');
const morgan = require('morgan');
const jwtAuth = require('../lib/jwt-auth');
const authRouter = require('../routers/auth-router');
const userRouter = require('../routers/user-router');
const bracketRouter = require('../routers/bracket-router');

mongoose.connect('mongodb://localhost/test');

app.use(morgan('dev'));
app.use('/api', authRouter);
app.use('/api/users', userRouter);
app.use('/api/brackets', bracketRouter);

app.get('/api/jwtAuth', jwtAuth, function(req, res) {
  res.json({msg: 'Success'});
});

app.use((err, req, res, next) => {
  res.status(err.statusCode).json(err.message);
  console.log(next);
});

app.listen(5000, function() {
  console.log('test server listening on port 5000');
});
