const express = require('express');

const routes = express.Router();

routes.get('/', function (req, res) {
  res.send('hello world');
});

// const AccessController = require('./app/controllers/AccessController');
// const HomeController = require('./app/controllers/HomeController');

// const authMiddleware = require('./app/middlewares/auth');

// routes.post('/login', AccessController.store);

// routes.use(authMiddleware);

// routes.get('/home', HomeController.show);

module.exports = routes;
