'use strict';

module.exports = function(app) {
  app.controller('SingleBracketController', ['$scope', '$rootScope', SingleBracketController]);

  function SingleBracketController($scope, $rs) {
    this.east = $rs.teams.east;
    this.west = $rs.teams.west;
    this.user = $scope.user;
  }
};
