'use strict';

module.exports = (app) => {
  app.component('kbSignOut', {
    controller: 'AuthController',
    template: require('./sign-out-template.html'),
    bindings: {
      baseUrl: '<',
      config: '<'
    }
  });
};
