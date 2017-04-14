'use strict';

module.exports = function(app) {
  app.controller('AuthController', ['$http', '$location', '$window', 'auth', '$log', function($http, $location, $window, auth, $log) {
    this.wrongPassword = false;
    this.confirmPassword = true;
    this.currentUser = auth.currentUser;

    this.signup = function(user) {
      $log.debug('AuthController.signup');
      if (user.password !== user.confirm) {
        this.confirmPassword = false;
        return;
      }
      if (user.password === user.confirm) {
        this.confirmPassword = true;
      }
      $http.post(this.baseUrl + '/signup', user)
        .then((res) => {
          auth.setToken(res.data.token);
          $location.path('/home');
        }, (err) => {
          $log.log('Error in AuthController.signup', err);
        });
    };

    this.signin = function(user) {
      $log.debug('AuthController.signin');
      $http.get(this.baseUrl + '/signin', {
        headers: {
          'Authorization': 'Basic ' + $window.btoa(user.username + ':' + user.password)
        }
      })
        .then((res) => {
          auth.setToken(res.data.token);
          $location.path('/home');
        }, (err) => {
          $log.log('Error in AuthController.signin', err);
        });
    };

    this.getUser = auth.getUser.bind(auth);
    this.signOut = auth.signOut.bind(auth);
    this.currentUser = auth.currentUser;
  }]);
};
