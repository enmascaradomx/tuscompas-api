const joi = require('joi');

const languageId = joi.string().length(2);
const name = joi.string().min(5).max(50);

const getLanguageSchema = joi.object({
  languageId: languageId.required()
});

const createLanguageSchema = joi.object({
  languageId: languageId.required(),
  name: name.required()
})

const updateLanguageSchema = joi.object({
  languageId,
  name
});

module.exports = { getLanguageSchema, updateLanguageSchema,createLanguageSchema }
