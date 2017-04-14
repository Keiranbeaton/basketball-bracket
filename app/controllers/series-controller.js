'use strict';

module.exports = function(app) {
  app.controller('SeriesController', ['$scope', '$log', SeriesController]);
  function SeriesController($scope, $log) {
    this.teamOne = $scope.teamOne;
    this.teamTwo = $scope.teamTwo;
    this.winner = $scope.winner;
    this.length = $scope.length;
    this.teamOneWins = 0;
    this.teamTwoWins = 0;
    this.teamOneClass = '';
    this.teamTwoClass = '';

    this.postInfo = function() {
      $log.log('this.teamOne', this.teamOne);
      $log.log('this.teamTwo', this.teamTwo);
      $log.log('this.winner', this.winner);
      $log.log('this.length', this.length);
      
      if (this.teamOne === this.winner) {
        this.teamOneWins = 4;
        this.teamTwoWins = parseInt(this.length) - 4;
        this.teamOneClass= 'winner';
        this.teamTwoClass = 'loser';
      }
      if (this.teamTwo === this.winner) {
        this.teamTwoWins = 4;
        this.teamOneWins = parseInt(this.length) - 4;
        this.teamTwoClass = 'winner';
        this.teamOneClass = 'loser';
      }
    };

  }
};
