'use strict';

module.exports = (app) => {
  require('./auth-controller')(app);
  require('./home-controller')(app);
  require('./series-controller')(app);
  require('./single-bracket-controller')(app);
  require('./brackets-controller')(app);
  require('./edit-bracket-controller')(app);
};
