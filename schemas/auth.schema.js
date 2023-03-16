const joi = require('joi');

const username = joi.string();
const password = joi.string();

const loginSchema = joi.object({
  username: username.required(),
  password: password.required()
});

module.exports = { loginSchema }
