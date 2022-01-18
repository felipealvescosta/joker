const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

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
    jokeId: {
      type: DataTypes.NUMBER,
    },
  },
  {
    sequelize,
    modelName: 'evaluated',
    timestamps: false,
  }
);

module.exports = Evaluated;
