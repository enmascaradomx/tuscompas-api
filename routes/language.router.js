const express = require('express');
const passport = require('passport');

const validatorHandler = require('../middlewares/validator.handler');
const { checkApiKey, checkAdminRole } = require('./../middlewares/auth.handler');
const { getLanguageSchema, createLanguageSchema } = require('../schemas/language.schema');
const LanguageService = require('./../services/language.service');

const router = express.Router();
const service = new LanguageService();

router.get('/',
  checkApiKey,
  async (req, res, next) => {
    try {
      const languages = await service.find();
      res.json(languages);
    } catch (error) {
      next(error);
    }
});

router.get('/:id',
  checkApiKey,
  validatorHandler(getLanguageSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const language = await service.findOne(id);
      res.json(language);
    } catch (error) {
      next (error);
    }
  }
);

router.post('/',
  checkApiKey,
  passport.authenticate('jwt', {session: false}),
  checkAdminRole,
  validatorHandler(createLanguageSchema, 'body'),
  async (req, res, next) => {
    try {
      const data = req.body;
      const newLanguage = await service.create(data);
      res.status(201).json(newLanguage);
    } catch (error) {
      next(error);
    }
  }
)

module.exports = router;
