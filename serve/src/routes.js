const express = require('express');

const routes = express.Router();

const loginController = require('./controllers/loginController');
const authMiddleware = require('./middleware/auth');
const userController = require('./controllers/userController');
const jokeController = require('./controllers/jokeController');

routes.post('/login', loginController.auth);
routes.post('/signup', userController.create);

routes.use(authMiddleware);

routes.get('/users', userController.index);
routes.post('/users', userController.create);
routes.get('/users/:id', userController.show);
routes.put('/users/:id', userController.update);
routes.delete('/users/:id', userController.delete);

routes.get('/jokes', jokeController.index);
routes.post('/jokes', jokeController.create);
routes.put('/jokes/:id', jokeController.update);
routes.get('/jokes/search', jokeController.search);
routes.get('/jokes/:id', jokeController.show);

module.exports = routes;
