const joi = require('joi');

const { createTextContentSchema } = require('./textContent.schema');

const id = joi.number().integer();
const nameTextId = joi.number().integer();
const enabled = joi.boolean();

const createEventTypeSchema = joi.object({
  name: createTextContentSchema.required(),
  enabled
});

const getEventTypeSchema = joi.object({
  id: id.required()
});

const updateEventTypeSchema = joi.object({
  nameTextId,
  enabled
});

module.exports = { createEventTypeSchema, getEventTypeSchema, updateEventTypeSchema }
