const SHA1 = require('sha1');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
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
      response.status(200).json({ message: 'User not found!' });
      return;
    }

    if (user.password !== passwordHash) {
      response.status(200).json({ message: 'Incorrect Password!' });
      return;
    }

    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
      },
      authConfig.secret,
      {
        expiresIn: authConfig.expiresIn,
      }
    );

    if (token) {
      response.json({
        user,
        token,
      });
    } else {
      response.status(401).json({ message: 'Incorrect data, try again!' });
    }
  },
};
