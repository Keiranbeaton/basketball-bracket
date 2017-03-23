'use strict';

module.exports = function(app) {
  app.controller('SingleBracketController', ['$scope', 'standings', SingleBracketController]);

  function SingleBracketController($scope, standings) {
    this.playoffPicture = standings.playoffPicture;
    this.user = $scope.user;
  }
};
