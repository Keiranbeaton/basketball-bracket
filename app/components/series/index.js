'use strict';

module.exports = (app) => {
  app.component('kbSeries', {
    controller: 'SeriesController',
    template: require('./series-template.html'),
    bindings: {
      topTeam: '<',
      bottomTeam: '<',
      length: '<'
    }
  });
};
