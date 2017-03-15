'use strict';

module.exports = function(app) {
  app.controller('AuthController', ['$http', '$location', '$window', 'auth', function($http, $location, $window, auth) {
    if (auth.getToken({noRedirect: true})) $location.path('/notes');

    this.signup = function(user) {
      $http.post(this.baseUrl + '/api/signup', user)
        .then((res) => {
          auth.setToken(res.data.token);
          $location.path('/home');
        }, (err) => {
          console.log('Error in AuthController.signup', err);
        });
    };

    this.signin = function(user) {
      $http.get(this.baseUrl + '/api/signin', {
        headers: {
          'Authorization': 'Basic ' + $window.btoa(user.email + ':' + user.password)
        }
      })
        .then((res) => {
          auth.setToken(res.data.token);
          $location.path('/home');
        }, (err) => {
          console.log('Error in AuthController.signin', err);
        });
    };

    this.getUser = auth.getUser.bind(auth);
    this.signOut = auth.signOut.bind(auth);
    this.currentUser = auth.currentUser;
  }]);
};
