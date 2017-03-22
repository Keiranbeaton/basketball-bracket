'use strict';

module.exports = function(app) {
  app.controller('HomeController', ['$log', '$http', 'standings', HomeController]);

  function HomeController($log, $http, standings) {
    this.playoffPicture = {};
    this.users = [];

    this.getUsers = function() {
      $log.debug('HomeController.getUsers');
      $http.get(this.baseUrl + '/users', this.config)
        .then((res) => {
          this.users = res;
        });
    };

    this.setStandings = function() {
      $log.debug('HomeController.getStandings');
      $http.get('stats.nba.com/stats/playoffpicture/?SeasonID=22016&LeagueID=00', this.config)
        .then((res) => {
          this.playoffPicture = {
            east: {
              one: {name: res.resultSets[2].rowSet[0][2], wins: res.resultSets[2].rowSet[0][4], losses: res.resultSets[2].rowSet[0][5]},
              two: {name: res.resultSets[2].rowSet[1][2], wins: res.resultSets[2].rowSet[1][4], losses: res.resultSets[2].rowSet[1][5]},
              three: {name: res.resultSets[2].rowSet[2][2], wins: res.resultSets[2].rowSet[2][4], losses: res.resultSets[2].rowSet[2][5]},
              four: {name: res.resultSets[2].rowSet[3][2], wins: res.resultSets[2].rowSet[3][4], losses: res.resultSets[2].rowSet[3][5]},
              five: {name: res.resultSets[2].rowSet[4][2], wins: res.resultSets[2].rowSet[4][4], losses: res.resultSets[2].rowSet[4][5]},
              six: {name: res.resultSets[2].rowSet[5][2], wins: res.resultSets[2].rowSet[5][4], losses: res.resultSets[2].rowSet[5][5]},
              seven: {name: res.resultSets[2].rowSet[6][2], wins: res.resultSets[2].rowSet[6][4], losses: res.resultSets[2].rowSet[6][5]},
              eight: {name: res.resultSets[2].rowSet[7][2], wins: res.resultSets[2].rowSet[7][4], losses: res.resultSets[2].rowSet[7][5]}
            },
            west: {
              one: {name: res.resultSets[3].rowSet[0][2], wins: res.resultSets[2].rowSet[0][4], losses: res.resultSets[2].rowSet[0][5]},
              two: {name: res.resultSets[3].rowSet[1][2], wins: res.resultSets[2].rowSet[1][4], losses: res.resultSets[2].rowSet[1][5]},
              three: {name: res.resultSets[3].rowSet[2][2], wins: res.resultSets[2].rowSet[2][4], losses: res.resultSets[2].rowSet[2][5]},
              four: {name: res.resultSets[3].rowSet[3][2], wins: res.resultSets[2].rowSet[3][4], losses: res.resultSets[2].rowSet[3][5]},
              five: {name: res.resultSets[3].rowSet[4][2], wins: res.resultSets[2].rowSet[4][4], losses: res.resultSets[2].rowSet[4][5]},
              six: {name: res.resultSets[3].rowSet[5][2], wins: res.resultSets[2].rowSet[5][4], losses: res.resultSets[2].rowSet[5][5]},
              seven: {name: res.resultSets[3].rowSet[6][2], wins: res.resultSets[2].rowSet[6][4], losses: res.resultSets[2].rowSet[6][5]},
              eight: {name: res.resultSets[3].rowSet[7][2], wins: res.resultSets[2].rowSet[7][4], losses: res.resultSets[2].rowSet[7][5]}
            }
          };
          standings.setStandings(this.playoffPicture);
        });
    };

    this.onPageLoad = function() {
      this.getStandings();
      this.getUsers();
    };

  }
};
