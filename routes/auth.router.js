const express = require('express');
const passport = require('passport');

const { checkApiKey } = require('./../middlewares/auth.handler');

const AuthService = require('./../services/auth.service');
const authService = new AuthService();

const router = express.Router();

router.post('/login',
  checkApiKey,
  passport.authenticate('local', {session: false}),
  async (req, res, next) => {
    try {
      const user = req.user;
      res.json(await authService.signToken(user));
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
