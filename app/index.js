'use strict';

require('!!file-loader?name=[name].[ext]!./html/index.html');
require('./scss/base.scss');

const angular = require('angular');
const angularRoute = require('angular-route');
const angularJwt = require('angular-jwt');
const bracketApp = angular.module('bracketApp', [angularRoute, angularJwt]);

bracketApp.run(['$rootScope', ($rs) => {
  $rs.master = {
    one: {winner: 'NA', length: 'NA'},
    two: {winner: 'NA', length: 'NA'},
    three: {winner: 'NA', length: 'NA'},
    four: {winner: 'NA', length: 'NA'},
    five: {winner: 'NA', length: 'NA'},
    six: {winner: 'NA', length: 'NA'},
    seven: {winner: 'NA', length: 'NA'},
    eight: {winner: 'NA', length: 'NA'},
    nine: {winner: 'NA', length: 'NA'},
    ten: {winner: 'NA', length: 'NA'},
    eleven: {winner: 'NA', length: 'NA'},
    twelve: {winner: 'NA', length: 'NA'},
    thirteen: {winner: 'NA', length: 'NA'},
    fourteen: {winner: 'NA', length: 'NA'},
    fifteen: {winner: 'NA', length: 'NA'}
  };
  $rs.teams = {
    east: {
      one: {seed: 1, name: 'CLE', wins: 51, losses: 29},
      two: {seed: 2, name: 'BOS', wins: 51, losses: 29},
      three: {seed: 3,name: 'TOR', wins: 50, losses: 31},
      four: {seed: 4, name: 'WAS', wins: 48, losses: 32},
      five: {seed: 5, name: 'ATL', wins: 42, losses: 38},
      six: {seed: 6, name: 'MIL', wins: 41, losses: 39},
      seven: {seed: 7, name: 'IND', wins: 40, losses: 40},
      eight: {seed: 8, name: 'CHI', wins: 39, losses: 41}
    },
    west: {
      one: {seed: 1, name: 'GSW', wins: 66, losses: 14},
      two: {seed: 2, name: 'SAS', wins: 61, losses: 19},
      three: {seed: 3, name: 'HOU', wins: 54, losses: 26},
      four: {seed: 4, name: 'LAC', wins: 49, losses: 31},
      five: {seed: 5, name: 'UTA', wins: 49, losses: 31},
      six: {seed: 6, name: 'OKC', wins: 46, losses: 34},
      seven: {seed: 7, name: 'MEM', wins: 43, losses: 38},
      eight: {seed: 8, name: 'POR', wins: 40, losses: 40}
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
