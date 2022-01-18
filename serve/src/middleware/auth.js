const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const authConfig = require('../config/auth');

const authMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token unauthorized.' });
  }

  const [, token] = authorization.split(' ');
  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    console.log(decoded);
    req.matriculaAluno = decoded.matricula;

    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;
