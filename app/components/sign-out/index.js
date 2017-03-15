'use strict';

module.exports = (app) => {
  app.component('kbSignout', {
    controller: 'AuthController',
    template: require('./signoutTemplate.html'),
    bindings: {
      baseUrl: '<',
      config: '<'
    }
  });
};
