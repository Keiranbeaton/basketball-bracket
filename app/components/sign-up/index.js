'use strict';

module.exports = (app) => {
  app.component('kbSignup', {
    controller: 'AuthController',
    template: require('./signupTemplate.html'),
    bindings: {
      baseUrl: '<',
      config: '<'
    }
  });
};
