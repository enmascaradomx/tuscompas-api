const { Strategy } = require('passport-local');

const AuthService = require('../../../services/auth.service');
const authService = new AuthService();

const LocalStrategy = new Strategy(
  async (username, password, done) => {
    try {
      const login = await authService.getUser(username, password);
      done(null, login);
    } catch (error) {
      done(error, false);
    }
  }
);

module.exports = LocalStrategy;
