'use strict';

module.exports = (app) => {
  app.component('kbSignIn', {
    controller: 'AuthController',
    template: require('./sign-in-template.html'),
    bindings: {
      baseUrl: '<',
      config: '<'
    }
  });
};
