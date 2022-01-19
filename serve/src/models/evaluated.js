const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Joke = require('./joke');

class Evaluated extends Model {}

Evaluated.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.NUMBER,
    },
    vote: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    sequelize,
    modelName: 'evaluated',
    timestamps: false,
  }
);

Evaluated.belongsTo(Joke, {
  constraint: true,
  foreignKey: 'jokeId',
});

Joke.hasMany(Evaluated, {
  foreignKey: 'jokeId',
});

module.exports = Evaluated;
