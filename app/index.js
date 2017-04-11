'use strict';

require('!!file-loader?name=[name].[ext]!./html/index.html');
require('./scss/base.scss');

const angular = require('angular');
const angularRoute = require('angular-route');
const angularJwt = require('angular-jwt');
const bracketApp = angular.module('bracketApp', [angularRoute, angularJwt]);

bracketApp.run(['$rootScope', ($rs) => {
  $rs.master = {
    one: {winner: 'TBD', length: 'NA'},
    two: {winner: 'TBD', length: 'NA'},
    three: {winner: 'TBD', length: 'NA'},
    four: {winner: 'TBD', length: 'NA'},
    five: {winner: 'TBD', length: 'NA'},
    six: {winner: 'TBD', length: 'NA'},
    seven: {winner: 'TBD', length: 'NA'},
    eight: {winner: 'TBD', length: 'NA'},
    nine: {winner: 'TBD', length: 'NA'},
    ten: {winner: 'TBD', length: 'NA'},
    eleven: {winner: 'TBD', length: 'NA'},
    twelve: {winner: 'TBD', length: 'NA'},
    thirteen: {winner: 'TBD', length: 'NA'},
    fourteen: {winner: 'TBD', length: 'NA'},
    fifteen: {winner: 'TBD', length: 'NA'}
  };
  $rs.teams = {
    east: {
      one: {name: 'CLE', wins: 51, losses: 29},
      two: {name: 'BOS', wins: 51, losses: 29},
      three: {name: 'TOR', wins: 50, losses: 31},
      four: {name: 'WAS', wins: 48, losses: 32},
      five: {name: 'ATL', wins: 42, losses: 38},
      six: {name: 'MIL', wins: 41, losses: 39},
      seven: {name: 'IND', wins: 40, losses: 40},
      eight: {name: 'CHI', wins: 39, losses: 41}
    },
    west: {
      one: {name: 'GSW', wins: 66, losses: 14},
      two: {name: 'SAS', wins: 61, losses: 19},
      three: {name: 'HOU', wins: 54, losses: 26},
      four: {name: 'LAC', wins: 49, losses: 31},
      five: {name: 'UTA', wins: 49, losses: 31},
      six: {name: 'OKC', wins: 46, losses: 34},
      seven: {name: 'MEM', wins: 43, losses: 38},
      eight: {name: 'POR', wins: 40, losses: 40}
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
