'use strict';

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Promise = require('bluebird');
const createError = require('http-errors');
const debug = require('debug')('server');
const cors = require('cors');
const morgan = require('morgan');

const authRouter = require('./backend/routers/auth-router.js');
const userRouter = require('./backend/routers/user-router');
const bracketRouter = require('./backend/routers/bracket-router');

process.env.APP_SECRET = 'Dev';

const port = process.env.PORT || 3000;
const mongoDbUri = process.env.MONGODB_URI || 'mongodb://localhost/basketballdev';

mongoose.Promise = Promise;
mongoose.connect(mongoDbUri);

app.use(express.static(`${__dirname}/build`));

app.use(morgan('dev'));
app.use(cors());

app.use('/api', authRouter);
app.use('/api/users', userRouter);
app.use('/api/brackets', bracketRouter);

app.all('*', function(req, res, next) {
  debug('Hit app.all 404 route');
  next(createError(404, `Error: ${req.method} :: ${req.url} is not a route`));
});

app.listen(port, function() {
  debug(`server up :: ${port}`);
});
