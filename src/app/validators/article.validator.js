import { celebrate, Joi, Segments } from 'celebrate';

export default {
  index: celebrate({
    [Segments.QUERY]: Joi.object().keys({
      page: Joi.number(),
      recursive: Joi.number(),

      category_id: Joi.when('recursive', {
        is: 1,
        then: Joi.number().positive().required(),
      }),
    }),
  }),

  show: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required(),
    }),
  }),

  store: celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      description: Joi.string().max(1000).required(),
      image_url: Joi.string().max(1000),
      content: Joi.binary().required(),
      category_id: Joi.number().positive().required(),
      user_id: Joi.number().positive().required(),
    }),
  }),

  update: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required(),
    }),

    [Segments.BODY]: Joi.object().keys({
      name: Joi.string(),
      description: Joi.string().max(1000),
      image_url: Joi.string().max(1000),
      content: Joi.binary(),
      category_id: Joi.number().positive(),
      user_id: Joi.number().positive(),
    }),
  }),

  delete: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required(),
    }),
  }),
};
