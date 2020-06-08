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
      parent_id: Joi.number().positive(),
    }),
  }),

  update: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required(),
    }),

    [Segments.BODY]: Joi.object().keys({
      name: Joi.string(),
      parent_id: Joi.number().positive(),
    }),
  }),

  delete: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required(),
    }),
  }),
};
