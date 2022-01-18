const axios = require('axios');

const Api = axios.create({
  baseURL: 'https://v2.jokeapi.dev/',
});

module.exports = Api;
