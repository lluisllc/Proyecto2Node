// service/index.js
const axios = require('axios');

class gamesApi {
  constructor() {
    this.api = axios.create({
      baseURL: 'https://www.freetogame.com/api'

    });
  }
  getAllGames = () => this.api.get('/games');
  getAllMobas = () => this.api.get('/games?category=moba');

}


module.exports = gamesApi;
