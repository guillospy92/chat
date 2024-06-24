import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
  WHATSAPP_TOKEN: Joi.required(),
  PORT: Joi.number().default(3001),
  WHATSAPP_HOST: Joi.required(),
  WHATSAPP_API_TOKEN: Joi.required(),
  WHATSAPP_ACCOUNT_ID: Joi.required(),
  WHATSAPP_PHONE_NUMBER_ID: Joi.required(),
});
