'use strict';

module.exports = (app) => {
  require('./home')(app);
  require('./series')(app);
  require('./single-bracket')(app);
  require('./brackets')(app);
  require('./edit-bracket')(app);
  require('./sign-up')(app);
  require('./sign-in')(app);
  require('./sign-out')(app);
};
