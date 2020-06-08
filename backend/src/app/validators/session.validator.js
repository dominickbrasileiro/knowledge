import { celebrate, Joi, Segments } from 'celebrate';

export default {
  store: celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email({ minDomainSegments: 1 }).required(),
      password: Joi.string().required(),
    }),
  }),
};
