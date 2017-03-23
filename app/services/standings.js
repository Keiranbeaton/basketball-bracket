'use strict';

module.exports = function(app) {
  app.factory('standings', ['$log', function($log) {
    return {
      playoffPicture: {},
      setStandings: function(obj) {
        $log.debug('standings.setStandings');
        this.playoffPicture = obj;
      }
    };
  }]);
};
