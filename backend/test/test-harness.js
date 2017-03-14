'use strict';

const mongoose = require('mongoose');
const Promise = require('bluebird');
mongoose.Promise = Promise;
process.env.APP_SECRET = 'testSecret';
require('./test-server');
require('./auth-test');
require('./user-test');
process.on('exit', (code) => {
  mongoose.connection.db.dropDatabase(() => console.log('db dropped ' + code));
});
