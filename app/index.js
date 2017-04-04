'use strict';

require('!!file-loader?name=[name].[ext]!./html/index.html');
require('./scss/base.scss');

const angular = require('angular');
const angularRoute = require('angular-route');
const angularJwt = require('angular-jwt');
const bracketApp = angular.module('bracketApp', [angularRoute, angularJwt]);

bracketApp.run(['$rootScope', ($rs) => {
  $rs.teams = {
    east: {
      one: {name: 'BOS', wins: 50, losses: 27},
      two: {name: 'CLE', wins: 49, losses: 27},
      three: {name: 'TOR', wins: 47, losses: 30},
      four: {name: 'WAS', wins: 46, losses: 31},
      five: {name: 'MIL', wins: 40, losses: 37},
      six: {name: 'ATL', wins: 39, losses: 38},
      seven: {name: 'CHI', wins: 38, losses: 39},
      eight: {name: 'MIA', wins: 37, losses: 40}
    },
    west: {
      one: {name: 'GSW', wins: 63, losses: 14},
      two: {name: 'SAS', wins: 59, losses: 17},
      three: {name: 'HOU', wins: 52, losses: 25},
      four: {name: 'UTA', wins: 47, losses: 30},
      five: {name: 'LAC', wins: 47, losses: 31},
      six: {name: 'OKC', wins: 43, losses: 33},
      seven: {name: 'MEM', wins: 42, losses: 35},
      eight: {name: 'POR', wins: 38, losses: 39}
    }
  };
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
