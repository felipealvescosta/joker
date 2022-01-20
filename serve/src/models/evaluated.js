const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Joke = require('./joke');
const User = require('./user');

class Evaluated extends Model {}

Evaluated.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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

Evaluated.belongsTo(User, {
  constraint: true,
  foreignKey: 'userId',
});

User.hasMany(Evaluated, {
  foreignKey: 'userId',
});

module.exports = Evaluated;
