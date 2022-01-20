const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class Joke extends Model {}

Joke.init(
  {
    id: {
      type: DataTypes.NUMBER,
      primaryKey: true,
    },
    joke: {
      type: DataTypes.STRING,
    },
    isHidden: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    sequelize,
    modelName: 'joke',
    timestamps: false,
  }
);

module.exports = Joke;
