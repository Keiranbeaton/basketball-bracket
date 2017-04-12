'use strict';

module.exports = function(app) {
  app.controller('BracketsController', ['$log', '$http', 'auth', BracketController]);

  function BracketController($log, $http, auth) {
    this.users = [];
    this.currentUser = {};
    this.signedIn = false;

    this.getUsers = function() {
      $log.debug('BracketController.getUsers');
      $http.get(this.baseUrl + '/users', this.config)
        .then((res) => {
          this.users = res;
          if (this.users.length) {
            this.users.sort(function(a, b) {
              return b.score - a.score;
            });
          }
        });
    };

    this.getCurrentUser = function() {
      $log.debug('BracketController.getCurrentuser');
      if(auth.currentUser.hasOwnProperty('userId') && auth.currentUser.userId.length > 1) {
        $http.get(this.baseUrl + '/users/' + auth.currentUser.userId, this.config)
          .then((res) => {
            this.signedIn = true;
            this.currentUser = res;
          });
      } else {
        this.signedIn = false;
      }
    };

    this.onPageLoad = function() {
      $log.debug('BracketController.onPageLoad');
      this.getUsers();
      this.getCurrentUser();
    };
  }
};
