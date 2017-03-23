'use strict';

module.exports = function(app) {
  app.factory('auth', ['$window', '$location', 'jwtHelper', function($window, $location, jwt) {
    return {
      currentUser: {},
      getToken: function(options) {
        options = options || {};
        if (this.token) return this.token;
        if ($window.localStorage.token) return this.setToken($window.localStorage.token);
        if (!options.noRedirect) $location.path('/signup');
      },
      setToken: function(token) {
        $window.localStorage.token = token;
        this.token = token;
        this.getUser();
        return token;
      },
      getUser: function() {
        let token = this.getToken();
        if (!token) return;
        let decoded = jwt.decodeToken(token);
        this.currentUser.username = decoded.username;
        this.currenUser.id = decoded.userId;
        return this.currentUser;
      },
      signOut: function() {
        $window.localStorage.token = '';
        this.currentUser = '';
        this.token = '';
        $location.path('/home');
      }
    };
  }]);
};
