'use strict';

module.exports = function(app) {
  app.controller('SingleBracketController', ['$scope', '$rootScope', '$log', SingleBracketController]);

  function SingleBracketController($scope, $rs, $log) {
    this.east = $rs.teams.east;
    this.west = $rs.teams.west;
    this.user = $scope.user;

    this.postInfo = function() {
      $log.log('this.user', this.user);
    };
  }
};
