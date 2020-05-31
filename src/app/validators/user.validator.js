import { celebrate, Joi, Segments } from 'celebrate';

export default {
  show: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required(),
    }),
  }),

  store: celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().email({ minDomainSegments: 1 }).required(),
      password: Joi.string().required(),
    }),
  }),

  update: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required(),
    }),

    [Segments.BODY]: Joi.object().keys({
      name: Joi.string(),
      email: Joi.string(),
      password: Joi.string(),
    }),
  }),
};
