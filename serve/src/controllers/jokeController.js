const Joke = require('../models/joke');
const Evaluated = require('../models/evaluated');
const User = require('../models/user');

const Api = require('../services/api');

module.exports = {
  async index(request, response) {
    try {
      const jokes = await Joke.findAll({
        include: Evaluated,
      });

      const jokesWithVotes = jokes.map((item) => {
        const joke = {
          id: item.id,
          joke: item.joke,
          category: item.category,
          evaluated: item.evaluateds,
          positive: item.evaluateds.filter((p) => p.vote === true),
          negative: item.evaluateds.filter((n) => n.vote === false),
        };
        return joke;
      });

      response.status(200).json(jokesWithVotes);
    } catch (error) {
      console.log(error);
      response.status(400).send(error);
    }
  },

  async search(request, response) {
    try {
      const { data } = await Api.get('joke/Any?amount=1&type=single');
      response.status(200).json(data);
    } catch (error) {
      console.log(error);
      response.status(400).send(error);
    }
  },

  async create(request, response) {
    const { id } = request.body.jokePayload.joke;
    const { userId, vote } = request.body.jokePayload;
    console.log(request.body);
    try {
      const joke = await Joke.findOne({ where: { id } });

      if (!joke) {
        await Joke.create(request.body.jokePayload.joke);
      }

      await Evaluated.create({
        userId,
        vote,
        jokeId: id,
      });

      response.status(201).json('Joke evaluated!!');
    } catch (error) {
      console.log(error);
      response.status(400).send(error);
    }
  },

  async show(request, response) {
    try {
      const { id } = request.params;
      const joke = await Evaluated.findAll({
        include: User,
        where: { jokeId: id },
      });

      if (!joke) {
        response.status(400).json('Joke not found');
      }

      const usersEvaluators = joke.map((item) => {
        const evaluators = {
          id: item.userId,
          name: item.user.name,
        };
        return evaluators;
      });

      console.log('jiiji',usersEvaluators);
      response.status(200).json({usersEvaluators});
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
