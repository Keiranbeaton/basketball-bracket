'use strict';

module.exports = (app) => {
  app.component('kbSingleBracket', {
    controller: 'SingleBracketController',
    template: require('./single-bracket-template.html'),
    bindings: {
      user: '<'
    }
  });
};
