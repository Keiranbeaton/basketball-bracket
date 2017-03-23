'use strict';

require('!!file?name=[name].[ext]!./html/index.html');
require('./scss/base.scss');

const angular = require('angular');
const angularRoute = require('angular-route');
const angularJwt = require('angular-jwt');
const bracketApp = angular.module('bracketApp', [angularRoute, angularJwt]);

bracketApp.run(['$rootScope', ($rs) => {
  $rs.baseUrl = `${__API_URL__}/api`;
  $rs.httpConfig = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  };
}]);

require('./services')(bracketApp);
require('./controllers')(bracketApp);
require('./components')(bracketApp);

bracketApp.config(['$routeProvider', '$locationProvider', ($rp, $lp) => {
  $lp.hashPrefix('');
  $rp
  .when('/home', {
    template: require('./html/home.html')
  })
  .when('/brackets', {
    template: require('./html/bracket.html')
  })
  .when('/brackets/:id', {
    template: require('./html/edit-bracket.html')
  })
  .when('/sign-up', {
    template: require('./html/signup.html')
  })
  .when('/sign-in', {
    template: require('./html/signin.html')
  })
  .when('/sign-out', {
    template: require('./html/signout.html')
  })
  .otherwise({
    redirectTo: '/home'
  });
}]);
