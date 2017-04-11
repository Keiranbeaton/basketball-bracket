'use strict';

module.exports = function(app) {
  app.controller('HomeController', ['$log', '$http', '$rootScope', 'auth', HomeController]);

  function HomeController($log, $http, $rs, auth) {
    this.east = $rs.teams.east;
    this.west = $rs.teams.west;
    this.master = $rs.master;
    this.users = [];
    this.currentUser = {};
    this.signedIn = false;

    this.getUsers = function() {
      $log.debug('HomeController.getUsers');
      $http.get(this.baseUrl + '/users', this.config)
        .then((res) => {
          this.users = res;
        });
    };
    this.getCurrentUser = function() {
      $log.debug('HomeController.getCurrentuser');
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
      this.getUsers();
      this.getCurrentUser();
    };

  }
};
