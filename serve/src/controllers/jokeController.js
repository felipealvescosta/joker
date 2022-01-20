const Joke = require('../models/joke');
const Evaluated = require('../models/evaluated');
const User = require('../models/user');

const Api = require('../services/api');

module.exports = {
  async index(request, response) {
    try {
      const jokes = await Joke.findAll({
        include: Evaluated,
        where: {
          isHidden: false,
        },
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

      return response.status(200).json(jokesWithVotes);
    } catch (error) {
      console.log(error);
      return response.status(400).send(error);
    }
  },

  async search(request, response) {
    try {
      const { data } = await Api.get('joke/Any?amount=1&type=single');

      return response.status(200).json(data);
    } catch (error) {
      console.log(error);
      return response.status(400).send(error);
    }
  },

  async create(request, response) {
    const { id, joke } = request.body.jokePayload.joke;
    const { userId, vote, isHidden } = request.body.jokePayload;

    const jokeInsert = {
      id,
      joke,
      isHidden,
    };

    try {
      const jokes = await Joke.findOne({ where: { id } });
      if (!jokes) {
        await Joke.create(jokeInsert);
      }

      await Evaluated.create({
        userId,
        vote,
        jokeId: id,
      });

      return response.status(201).json('Joke evaluated!!');
    } catch (error) {
      console.log(error);
      return response.status(400).send(error);
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
        return response.status(400).json('Joke not found');
      }

      const usersEvaluators = joke.map((item) => {
        const evaluators = {
          id: item.userId,
          name: item.user.name,
        };
        return evaluators;
      });

      return response.status(200).json(usersEvaluators);
    } catch (error) {
      console.log(error);
      return response.status(400).send(error);
    }
  },

  async update(request, response) {
    const { id } = request.params;

    try {
      const joke = await Joke.findOne({ where: { id } });

      if (!joke) {
        return response.status(400).json('Joke not found');
      }

      joke.isHidden = true;

      await joke.save();

      return response.status(200).json('Joke uptated!!');
    } catch (error) {
      console.log(error);
      return response.status(400).send(error);
    }
  },
};
