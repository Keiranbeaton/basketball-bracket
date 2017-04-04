'use strict';

module.exports = (app) => {
  app.controller('EditBracketController', ['$log', '$http', '$location', '$rootScope', 'auth', EditBracketController]);

  function EditBracketController($log, $http, $location, $rs, auth) {
    this.baseUrl = $rs.baseUrl;
    this.config = $rs.httpConfig;
    this.bracket = {
      seriesOne: {id: 1, length: 0, winner: ''},
      seriesTwo: {id: 2, length: 0, winner: ''},
      seriesThree: {id: 3, length: 0, winner: ''},
      seriesFour: {id: 4, length: 0, winner: ''},
      seriesFive: {id: 5, length: 0, winner: ''},
      seriesSix: {id: 6, length: 0, winner: ''},
      seriesSeven: {id: 7, length: 0, winner: ''},
      seriesEight: {id: 8, length: 0, winner: ''},
      seriesNine: {id: 9, length: 0, winner: ''},
      seriesTen: {id: 10, length: 0, winner: ''},
      seriesEleven: {id: 11, length: 0, winner: ''},
      seriesTwelve: {id: 12, length: 0, winner: ''},
      seriesThirteen: {id: 13, length: 0, winner: ''},
      seriesFourteen: {id: 14, length: 0, winner: ''},
      seriesFifteen: {id: 15, length: 0, winner: ''},
    };
    this.seriesOneClass = '';
    this.seriesTwoClass = '';
    this.seriesThreeClass = '';
    this.seriesFourClass = '';
    this.seriesFiveClass = '';
    this.seriesSixClass = '';
    this.seriesSevenClass = '';
    this.seriesEightClass = '';
    this.seriesNineClass = '';
    this.seriesTenClass = '';
    this.seriesElevenClass = '';
    this.seriesTwelveClass = '';
    this.seriesThirteenClass = '';
    this.seriesFourteenClass = '';
    this.seriesFifteenClass = '';
    this.topChosen = 'top-chosen';
    this.bottomChosen = 'bottom-chosen';
    this.hasBracket = false;
    this.successMessage = false;
    this.failedMessage = false;
    this.east = $rs.teams.east;
    this.west = $rs.teams.west;
    this.currentUser = {};

    this.getCurrentUser = function() {
      $log.debug('EditBracketController.getCurrentuser');
      if(auth.currentUser.hasOwnProperty('userId') && auth.currenUser.userId.length > 1) {
        $http.get(this.baseUrl + '/users/' + auth.currentUser.userId, this.config)
          .then((res) => {
            this.signedIn = true;
            this.currentUser = res;
            this.checkBracket();
          });
      } else {
        this.signedIn = false;
      }
    };

    this.checkBracket = function() {
      $log.debug('EditBracketController.checkBracket');
      if (this.currentUser.bracket) {
        this.bracket = this.currentUser.bracket;
        this.hasBracket = true;
      }
    };

    this.onPageLoad = function() {
      $log.debug('EditBracketController.onPageLoad');
      this.getCurrentUser();
    };

    this.chooseWinner = function(winner, dest, divClass, topOrBottom) {
      $log.debug('EditBracketController.chooseWinner');
      $log.log('winner, dest', winner, dest);
      dest = winner;
      $log.log('divClass, topOrBottom', divClass, topOrBottom);
      divClass = topOrBottom;
    };

    this.postBracket = function() {
      $log.debug('EditBracketController.postBracket');
      $http.post(this.baseUrl + '/brackets', this.bracket, this.config)
        .then((res) => {
          $log.debug('Successfully saved bracket');
          $log.debug('Res', res);
          this.hasBracket = true;
          this.successMessage = true;
          this.failedMessage = false;
        }, (err) => {
          $log.debug('Bracket Save Failed');
          $log.debug('error message', err);
          this.hasBracket = false;
          this.failedMessage = true;
          this.successMessage = true;
        });
    };

    this.putBracket = function() {
      $log.debug('EditBracketController.putBracket');
      $http.put(this.baseUrl + '/brackets/' + this.bracket._id, this.bracket, this.config)
        .then((res) => {
          $log.debug('Successfully saved Bracket');
          $log.debug('Res', res);
          this.hasBracket = true;
          this.successMessage = true;
          this.failedMessage = false;
        }, (err) => {
          $log.debug('Bracket save failed');
          $log.debug('error message', err);
          this.failedMessage = true;
          this.successMessage = false;
        });
    };
  }
};
