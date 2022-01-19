const SHA1 = require('sha1');
const User = require('../models/user');

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
    const { name, email, password, isAdmin } = request.body.values;
    console.log(request.body.values);
    const secretPass = SHA1(password);

    const user = {
      name,
      email,
      password: secretPass,
      isAdmin: false,
    };

    try {
      await User.create(user);
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
      const { name, email, isAdmin } = request.body.values;
      console.log(request.body);
      const { id } = request.params;
      const user = await User.findOne({ where: { id } });

      if (!user) {
        return response.status(400).json('User not found');
      }
      user.name = name;
      user.email = email;
      user.isAdmin = isAdmin;

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
