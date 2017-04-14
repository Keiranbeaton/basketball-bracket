'use strict';

module.exports = (app) => {
  app.controller('EditBracketController', ['$log', '$http', '$location', '$rootScope', 'auth', EditBracketController]);

  function EditBracketController($log, $http, $location, $rs, auth) {
    this.baseUrl = $rs.baseUrl;
    this.config = $rs.httpConfig;
    this.bracket = {
      seriesOne: {id: 1, length: 4, winner: 'tbd'},
      seriesTwo: {id: 2, length: 4, winner: 'tbd'},
      seriesThree: {id: 3, length: 4, winner: 'tbd'},
      seriesFour: {id: 4, length: 4, winner: 'tbd'},
      seriesFive: {id: 5, length: 4, winner: 'tbd'},
      seriesSix: {id: 6, length: 4, winner: 'tbd'},
      seriesSeven: {id: 7, length: 4, winner: 'tbd'},
      seriesEight: {id: 8, length: 4, winner: 'tbd'},
      seriesNine: {id: 9, length: 4, winner: 'tbd'},
      seriesTen: {id: 10, length: 4, winner: 'tbd'},
      seriesEleven: {id: 11, length: 4, winner: 'tbd'},
      seriesTwelve: {id: 12, length: 4, winner: 'tbd'},
      seriesThirteen: {id: 13, length: 4, winner: 'tbd'},
      seriesFourteen: {id: 14, length: 4, winner: 'tbd'},
      seriesFifteen: {id: 15, length: 4, winner: 'tbd'},
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
    this.lengthOptions = [{value:4, label: 'Four'}, {value:5, label: 'Five'}, {value:6, label: 'Six'}, {value:7, label:'Seven'}];

    this.submitBracket;

    this.getCurrentUser = function() {
      $log.debug('EditBracketController.getCurrentuser');
      if(auth.currentUser.hasOwnProperty('id') && auth.currentUser.id.length > 1) {
        $http.get(this.baseUrl + '/users/' + auth.currentUser.id, this.config)
          .then((res) => {
            this.signedIn = true;
            this.currentUser = res.data;
            $log.log('res', res);
            this.checkBracket();
          }, (err) => {
            $log.log('error in getCurrentUser', err);
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
        this.submitBracket = this.putBracket;
        $log.log('submitBracket should === putBracket', this.submitBracket, this.putBracket);
      }
      if (!this.currentUser.bracket) {
        this.hasBracket = false;
        this.submitBracket = this.postBracket;
        $log.log('submitBracket should === postBracket', this.submitBracket, this.postBracket);
      }
    };

    this.onPageLoad = function() {
      $log.debug('EditBracketController.onPageLoad');
      this.getCurrentUser();
    };

    this.postBracket = function() {
      $log.debug('EditBracketController.postBracket');
      this.bracket.userId = this.currentUser._id;
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
          this.successMessage = false;
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
