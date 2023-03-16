const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const { config } = require('./../config/config');

function checkApiKey (req, res, next) {
  const apiKey = req.headers['x-api-key'];
  if (apiKey && config.apiKey && apiKey === config.apiKey) {
    next();
  } else {
    next(boom.unauthorized());
  }
}

async function checkAdminRole (req, res, next) {
  const user = req.user;
  if (user.role) {
    //the value on token is encrypted. The value in the config, is plain text
    const adminRole = await bcrypt.compare(config.adminRole, user.role);
    if (adminRole) {
      return next();
    }
  }
  next(boom.unauthorized());
}

module.exports = { checkApiKey, checkAdminRole };
