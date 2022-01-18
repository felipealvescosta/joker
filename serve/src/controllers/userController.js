const User = require('../models/userModel');

module.exports = {
  async index(request, response) {
    try {
      const users = await User.findAll();
      return response.status(200).json(users);
    } catch (error) {
      console.log(error);
      return response.status(400).send(error);
    }
  },
  async create(request, response) {
    try {
      await User.create(request.body);
      return response.status(200).json('User inserted!!');
    } catch (error) {
      console.log(error);
      return response.status(400).send(error);
    }
  },
  async show(request, response) {
    try {
      const { id } = request.params;
      const user = await User.findOne({ where: { id } });
      if (!user) {
        return response.status(400).json('User not found');
      }
      return response.status(200).json(user);
    } catch (error) {
      console.log(error);
      return response.status(400).send(error);
    }
  },
  async update(request, response) {
    try {
      const { name, email } = request.body;
      const { id } = request.params;
      const user = await User.findOne({ where: { id } });

      if (!user) {
        return response.status(400).json('User not found');
      }
      user.name = name;
      user.email = email;

      await user.save();
      return response.status(200).json('User uptated!!');
    } catch (error) {
      console.log(error);
      return response.status(400).send(error);
    }
  },
  async delete(request, response) {
    try {
      const { id } = request.params;
      const user = await User.destroy({ where: { id } });
      if (!user) {
        return response.status(400).json('User not found');
      }
      return response.status(200).json('User removed!!');
    } catch (error) {
      console.log(error);
      return response.status(400).send(error);
    }
  },
};
