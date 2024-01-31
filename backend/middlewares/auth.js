const jwt = require('jsonwebtoken');
const AuthorizationError = require('../errors/AuthorizationError');
const { NODE_ENV, SECRET_SIGNING_KEY } = require('../utils/constants');

const extractBearerToken = function (header) {
  return header.replace('Bearer ', '');
};

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthorizationError('Неправильные почта или пароль');
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? SECRET_SIGNING_KEY : 'dev-secret');
  } catch (err) {
    next(new AuthorizationError('Неправильные почта или пароль'));
  }

  req.user = payload;

  next();
};
