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
    this.audioSrc = require('../assets/nba-theme.mp3');

    this.getUsers = function() {
      $log.debug('HomeController.getUsers');
      $http.get(this.baseUrl + '/users', this.config)
        .then((res) => {
          this.users = res.data;
          this.users.forEach((user) => {
            let master = $rs.master;
            let bracket = user.bracket;
            let newScore = 0;
            if (user.bracket) {
              if (bracket.seriesOne.winner === master.one.winner) {
                newScore += 1;
                if (bracket.seriesOne.length === master.one.length) {
                  newScore +=1;
                }
              }
              if (bracket.seriesTwo.winner === master.two.winner) {
                newScore += 1;
                if (bracket.seriesTwo.length === master.two.length) {
                  newScore +=1;
                }
              }
              if (bracket.seriesThree.winner === master.three.winner) {
                newScore += 1;
                if (bracket.seriesThree.length === master.three.length) {
                  newScore +=1;
                }
              }
              if (bracket.seriesFour.winner === master.four.winner) {
                newScore += 1;
                if (bracket.seriesFour.length === master.four.length) {
                  newScore +=1;
                }
              }
              if (bracket.seriesFive.winner === master.five.winner) {
                newScore += 1;
                if (bracket.seriesFive.length === master.five.length) {
                  newScore +=1;
                }
              }
              if (bracket.seriesSix.winner === master.six.winner) {
                newScore += 1;
                if (bracket.seriesSix.length === master.six.length) {
                  newScore +=1;
                }
              }
              if (bracket.seriesSeven.winner === master.seven.winner) {
                newScore += 1;
                if (bracket.seriesSeven.length === master.seven.length) {
                  newScore +=1;
                }
              }
              if (bracket.seriesEight.winner === master.eight.winner) {
                newScore += 1;
                if (bracket.seriesEight.length === master.eight.length) {
                  newScore +=1;
                }
              }
              if (bracket.seriesNine.winner === master.nine.winner) {
                newScore += 2;
                if (bracket.seriesNine.length === master.nine.length) {
                  newScore +=1;
                }
              }
              if (bracket.seriesTen.winner === master.ten.winner) {
                newScore += 2;
                if (bracket.seriesTen.length === master.ten.length) {
                  newScore +=1;
                }
              }
              if (bracket.seriesEleven.winner === master.eleven.winner) {
                newScore += 2;
                if (bracket.seriesEleven.length === master.eleven.length) {
                  newScore +=1;
                }
              }
              if (bracket.seriesTwelve.winner === master.twelve.winner) {
                newScore += 2;
                if (bracket.seriesTwelve.length === master.twelve.length) {
                  newScore +=1;
                }
              }
              if (bracket.seriesThirteen.winner === master.thirteen.winner) {
                newScore += 4;
                if (bracket.seriesThirteen.length === master.thirteen.length) {
                  newScore +=1;
                }
              }
              if (bracket.seriesFourteen.winner === master.fourteen.winner) {
                newScore += 4;
                if (bracket.seriesFourteen.length === master.fourteen.length) {
                  newScore +=1;
                }
              }
              if (bracket.seriesFifteen.winner === master.fifteen.winner) {
                newScore += 8;
                if (bracket.seriesFifteen.length === master.fifteen.length) {
                  newScore +=1;
                }
              }
              user.score = newScore;
            } else {
              user.score = 0;
            }
          });
        });
    };

    this.getCurrentUser = function() {
      $log.debug('HomeController.getCurrentuser');
      if(auth.currentUser.hasOwnProperty('id') && auth.currentUser.id.length > 1) {
        $http.get(this.baseUrl + '/users/' + auth.currentUser.id, this.config)
          .then((res) => {
            this.signedIn = true;
            this.currentUser = res.data;
          });
      } else {
        this.signedIn = false;
      }
    };


    this.onPageLoad = function() {
      this.getUsers();
      this.getCurrentUser();
      $log.log('auth.currentUser.id', auth.currentUser.id);
      $log.log('auth.currentUser.username', auth.currentUser.username);
    };

  }
};
