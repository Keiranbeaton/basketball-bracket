'use strict';

module.exports = function(app) {
  app.controller('SeriesController', ['$scope', SeriesController]);
  function SeriesController($scope) {
    this.teamOne = $scope.teamOne;
    this.teamTwo = $scope.teamTwo;
    this.winner = $scope.winner;
    this.length = $scope.length;
    this.teamOneWins = 0;
    this.teamTwoWins = 0;
    this.teamOneClass = '';
    this.teamTwoClass = '';
    if (this.teamOne === this.winner) {
      this.teamOneWins = 4;
      this.teamTwoWins = this.length - 4;
      this.teamOneClass= 'winner';
      this.teamTwoClass = 'loser';
    }
    if (this.teamTwo === this.winner) {
      this.teamTwoWins = 4;
      this.teamOneWins = this.length - 4;
      this.teamTwoClass = 'winner';
      this.teamOneClass = 'loser';
    }
  }
};
