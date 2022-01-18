const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class Joke extends Model {}

Joke.init(
  {
    uid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.BOOLEAN,
    },
    category: {
      type: DataTypes.STRING,
    },
    joke: {
      type: DataTypes.STRING,
    },
    id: {
      type: DataTypes.NUMBER,
    },
    lang: {
      type: DataTypes.STRING,
    },
    safe: {
      type: DataTypes.BOOLEAN,
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
