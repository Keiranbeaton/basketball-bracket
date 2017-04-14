'use strict';

module.exports = (app) => {
  app.component('kbSignUp', {
    controller: 'AuthController',
    template: require('./sign-up-template.html'),
    bindings: {
      baseUrl: '<',
      config: '<'
    }
  });
};
