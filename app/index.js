'use strict';

require('!!file-loader?name=[name].[ext]!./html/index.html');
require('./scss/base.scss');

const angular = require('angular');
const angularRoute = require('angular-route');
const angularJwt = require('angular-jwt');
const bracketApp = angular.module('bracketApp', [angularRoute, angularJwt]);

bracketApp.run(['$rootScope', ($rs) => {
  $rs.master = {
    one: {winner: 'GSW', length: 4},
    two: {winner: 'UTA', length: 7},
    three: {winner: 'HOU', length: 5},
    four: {winner: 'SAS', length: 6},
    five: {winner: 'BOS', length: 6},
    six: {winner: 'WAS', length: 6},
    seven: {winner: 'TOR', length: 6},
    eight: {winner: 'CLE', length: 4},
    nine: {winner: 'GSW', length: 4},
    ten: {winner: 'SAS', length: 6},
    eleven: {winner: 'NA', length: 'NA'},
    twelve: {winner: 'CLE', length: 4},
    thirteen: {winner: 'NA', length: 'NA'},
    fourteen: {winner: 'NA', length: 'NA'},
    fifteen: {winner: 'NA', length: 'NA'}
  };
  $rs.teams = {
    east: {
      one: {seed: 1, name: 'BOS', wins: 53, losses: 29},
      two: {seed: 2, name: 'CLE', wins: 51, losses: 31},
      three: {seed: 3,name: 'TOR', wins: 51, losses: 31},
      four: {seed: 4, name: 'WAS', wins: 49, losses: 33},
      five: {seed: 5, name: 'ATL', wins: 43, losses: 39},
      six: {seed: 6, name: 'MIL', wins: 42, losses: 40},
      seven: {seed: 7, name: 'IND', wins: 42, losses: 40},
      eight: {seed: 8, name: 'CHI', wins: 41, losses: 41}
    },
    west: {
      one: {seed: 1, name: 'GSW', wins: 67, losses: 15},
      two: {seed: 2, name: 'SAS', wins: 61, losses: 21},
      three: {seed: 3, name: 'HOU', wins: 55, losses: 27},
      four: {seed: 4, name: 'LAC', wins: 51, losses: 31},
      five: {seed: 5, name: 'UTA', wins: 51, losses: 31},
      six: {seed: 6, name: 'OKC', wins: 47, losses: 35},
      seven: {seed: 7, name: 'MEM', wins: 43, losses: 39},
      eight: {seed: 8, name: 'POR', wins: 41, losses: 41}
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
    template: require('./html/brackets.html')
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
