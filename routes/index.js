const express = require('express');

const languageRouter = require('./language.router');
const eventTypeRouter = require('./eventType.router');
const userRouter = require('./user.router');
const authRouter = require('./auth.router');

function routerApi(app) {
  const router = express.Router();

  app.use('/api/v1', router);
  router.use('/languages', languageRouter);
  router.use('/eventTypes', eventTypeRouter);
  router.use('/users', userRouter);
  router.use('/auth', authRouter);
}

module.exports = routerApi;
