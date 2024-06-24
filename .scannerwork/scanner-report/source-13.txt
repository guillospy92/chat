import * as process from 'process';

export const EnvConfiguration = () => ({
  environment: process.env.NODE_ENV || 'dev',
  host: process.env.HOST || 3000,
  token: process.env.WHATSAPP_TOKEN,
  whatsAppHost: process.env.WHATSAPP_HOST,
  whatsAppApiToken: process.env.WHATSAPP_API_TOKEN,
  whatsAppAccountId: process.env.WHATSAPP_ACCOUNT_ID,
  whatsAppPhoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID,
});
