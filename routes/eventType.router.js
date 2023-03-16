const express = require('express');

const EventTypeService = require('./../services/eventType.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { createEventTypeSchema, updateEventTypeSchema, getEventTypeSchema } = require('./../schemas/eventType.schema');

const router = express.Router();
const service = new EventTypeService();

router.get('/',
  async (req, res, next) => {
    try {
      const data = await service.find();
      res.json(data);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(createEventTypeSchema, 'body'),
  async (req, res, next) => {
    try {
      const data = req.body;
      const newEventType = await service.create(data);
      res.status(201).json(newEventType);
    } catch (error) {
      next(error);
    }
  }
);

router.get('/:id',
  validatorHandler(getEventTypeSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const eventType = await service.findOne(id);
      res.json(eventType);
    } catch(error) {
      next(error);
    }
  }
);

router.patch('/:id',
  validatorHandler(getEventTypeSchema, 'params'),
  validatorHandler(updateEventTypeSchema, 'body'),
  async (req, res, next) => {
    try {
      const data = req.body;
      const { id } = req.params;
      const updatedEventType = service.update(id, data);
      res.json(updatedEventType);
    } catch (error) {
      next (error);
    }
  }
);

module.exports = router;
