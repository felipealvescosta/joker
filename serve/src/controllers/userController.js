const User = require('../models/userModel');

module.exports = {
  async all(request, response) {
    try {
      const users = await User.findAll();
      response.status(200).json(users);
    } catch (error) {
      console.log(error);
      response.status(400).send(error);
    }
  },
  async create(request, response) {
    try {
      await User.create(request.body);
      response.status(200).json('User inserted!!');
    } catch (error) {
      console.log(error);
      response.status(400).send(error);
    }
  },
  async one(request, response) {
    try {
      const { id } = request.params;
      const user = await User.findOne({ where: { id } });
      if (!user) {
        return response.status(400).json('User not found');
      }
      response.status(200).json(user);
    } catch (error) {
      console.log(error);
      response.status(400).send(error);
    }
  },
  async update(request, response) {
    try {
      const { name, price, description, category } = request.body;
      const { id } = request.params;
      const user = await User.findOne({ where: { id } });

      if (!user) {
        return response.status(400).json('User not found');
      }
      User.name = name;
      User.price = price;
      User.description = description;
      User.category = category;

      await User.save();
      response.status(200).json('User uptated!!');
    } catch (error) {
      console.log(error);
      response.status(400).send(error);
    }
  },
  async delete(request, response) {
    try {
      const { id } = request.params;
      const user = await User.destroy({ where: { id } });
      if (!user) {
        return response.status(400).json('User not found');
      }
      response.status(200).json('User removed!!');
    } catch (error) {
      console.log(error);
      response.status(400).send(error);
    }
  },
};
