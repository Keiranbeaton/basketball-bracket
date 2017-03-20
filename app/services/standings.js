'use strict';

module.exports = function(app) {
  app.factory('standings', ['$log', function($log) {
    return {
      playoffPicture: {},
      setStandings: function(obj) {
        this.playoffPicture = obj;
      }
    };
  }]);
};
