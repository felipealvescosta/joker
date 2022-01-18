const SHA1 = require('sha1');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const authConfig = require('../config/auth');

module.exports = {
  async auth(request, response) {
    const { email, password } = request.body;

    const passwordHash = SHA1(password);

    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      response.status(201).json({ message: 'User not found!' });
    }
    if (user.password !== passwordHash) {
      response.status(401).json({ message: 'Incorrect Password!' });
    }

    const token = jwt.sign({ email: user.email }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });

    if (token) {
      response.json({
        token,
      });
    } else {
      response.status(404).json({ message: 'Incorrect data, try again!' });
    }
  },
};
