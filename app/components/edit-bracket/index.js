'use strict';

module.exports = (app) => {
  app.component('kbEditBracket', {
    controller: 'EditBracketController',
    template: require('./edit-bracket-template.html'),
    bindings: {
      baseUrl: '<',
      config: '<'
    }
  });
};
