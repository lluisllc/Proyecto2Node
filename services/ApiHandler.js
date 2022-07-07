// service/index.js
const axios = require('axios');

class gamesApi {
  constructor() {
    this.api = axios.create({
      baseURL: 'https://www.freetogame.com/api'

    });
  }
  getAllGames = () => this.api.get('/games');
  getAllShooters = () => this.api.get('/games?category=shooter');
  getGameByID = (idGame) => this.api.get(`/game?id=${idGame}`);
  getGameByPopularity = () => this.api.get('/games?sort-by=popularity')
  
  // https://www.freetogame.com/api/game?id=452

}


module.exports = gamesApi;
