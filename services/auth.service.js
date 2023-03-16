const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { config } = require('./../config/config');

const LoginService = require('./login.service');
const loginService = new LoginService();
const UserService = require('./user.service');
const userService = new UserService();

class AuthService {

  constructor() {}

  async getUser(username, password) {
    const login = await loginService.findByUsername(username);

    if (!login || !login.user.enabled || !login.user.verified) {
      throw boom.unauthorized();
    }

    const isMatch = await bcrypt.compare(password, login.password);
    if (!isMatch) {
      throw boom.unauthorized();
    }

    delete login.dataValues.password;
    return login;
  }

  async signToken(user) {
    const userInfo = await userService.findOne(user.userId);
    if (!userInfo) {
      throw boom.notFound('user not found!');
    }
    const payload = {
      sub: user.userId,
      role: userInfo.role
    };
    const token = jwt.sign(payload, config.jwtSecret, {
      expiresIn: '24h'
    });
    return {
      token
    }
  }
}

module.exports = AuthService;
