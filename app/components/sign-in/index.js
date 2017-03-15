'use strict';

module.exports = (app) => {
  app.component('kbSignin', {
    controller: 'AuthController',
    template: require('./signinTemplate.html'),
    bindings: {
      baseUrl: '<',
      config: '<'
    }
  });
};
