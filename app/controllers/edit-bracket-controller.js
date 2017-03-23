'use strict';

module.exports = (app) => {
  app.controller('EditBracketController', ['$log', '$http', '$location', 'auth', EditBracketController]);

  function EditBracketController($log, $http, $location, auth, standings) {
    this.seriesLength = [{value: 4, label: 'Four'}, {value: 5, label: 'Five'}, {value: 6, label: 'Six'}, {value: 7, label: 'Seven'}];

    this.playoffPicture = {};
    this.bracket = {};
    this.currentUser = {};

    this.getCurrentUser = function() {
      $log.debug('EditBracketController.getCurrentuser');
      if(auth.currentUser.hasOwnProperty('userId') && auth.currenUser.userId.length > 1) {
        $http.get(this.baseUrl + '/users/' + auth.currentUser.userId, this.config)
          .then((res) => {
            this.signedIn = true;
            this.currentUser = res;
          });
      } else {
        this.signedIn = false;
      }
    };

    this.setTeams = function() {
      $log.debug('EditBracketController.setTeams');
      this.playoffPicture = standings.playoffPicture;
    };

    this.onPageLoad = function() {
      $log.debug('EditBracketController.onPageLoad');
      this.getCurrentUser();
      this.setTeams();
    };
  }
};
