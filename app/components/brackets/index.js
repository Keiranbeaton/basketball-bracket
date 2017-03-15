'use strict';

module.exports = (app) => {
  app.component('kbBrackets', {
    controller: 'BracketsController',
    template: require('./brackets-template.html'),
    bindings: {
      baseUrl: '<',
      config: '<'
    }
  });
};
