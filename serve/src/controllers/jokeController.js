const Joke = require('../models/jokeModel');
const Evaluated = require('../models/evaluatedJoke');
const Api = require('../services/api');

module.exports = {
  async index(request, response) {
    try {
      const jokes = await Joke.findAll();
      response.status(200).json(jokes);
    } catch (error) {
      console.log(error);
      response.status(400).send(error);
    }
  },
  async search(request, response) {
    try {
      const { data } = await Api.get('joke/Any?amount=1&type=single');

      response.json({
        data,
      });
    } catch (error) {
      console.log(error);
      response.status(400).send(error);
    }
  },
  async create(request, response) {
    const { userId, id } = request.body;

    try {
      const joke = await Joke.findOne({ where: { id } });

      if (!joke) {
        await Joke.create(request.body);
      }

      await Evaluated.create({
        userId,
        jokeId: id,
      });

      response.status(200).json('Joke evaluated!!');
    } catch (error) {
      console.log(error);
      response.status(400).send(error);
    }
  },
  async one(request, response) {
    try {
      const { id } = request.params;
      const joke = await Joke.findOne({ where: { id } });
      if (!joke) {
        response.status(400).json('Joke not found');
      }
      response.status(200).json(joke);
    } catch (error) {
      console.log(error);
      response.status(400).send(error);
    }
  },
  async update(request, response) {
    try {
      const { isHidden } = request.body;
      const { id: uid } = request.params;
      const joke = await Joke.findOne({ where: { uid } });

      if (!joke) {
        response.status(400).json('Joke not found');
      }

      joke.isHidden = isHidden;

      await joke.save();
      response.status(200).json('Joke uptated!!');
    } catch (error) {
      console.log(error);
      response.status(400).send(error);
    }
  },
};
