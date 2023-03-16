const express = require('express');
const passport = require('passport');

const { checkApiKey, checkAdminRole } = require('../middlewares/auth.handler');
const validatorHandler = require('./../middlewares/validator.handler');

const { createUserSchema, createUserOnlySchema } = require('./../schemas/user.schema');

const UserService = require('../services/user.service');

const router = express.Router();
const service = new UserService();

router.get('/',
  checkApiKey,
  passport.authenticate('jwt', { session: false}),
  checkAdminRole,
  async (req, res, next) => {
    try {
      const data = await service.find();
      res.json(data);
    } catch (error) {
      next(error);
    }
  }
);

router.get('/profile',
  checkApiKey,
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const userId = req.user.sub;
      const user = await service.findOne(userId);
      res.json(user);
    } catch (error) {
      next (error);
    }
  }
);

router.post('/signup',
  checkApiKey,
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const data = req.body;
      const newUser = await service.create(data);
      res.json(newUser);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/preregister',
  checkApiKey,
  validatorHandler(createUserOnlySchema, 'body'),
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const userId = req.user.sub;
      const data = req.body;
      const newUser = await service.createUserOnly(data, userId);
      res.json(newUser);
    } catch (error) {
      next (error);
    }
  }
);

module.exports = router;
