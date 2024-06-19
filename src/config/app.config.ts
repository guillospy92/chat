import * as process from 'process';

export const EnvConfiguration = () => ({
  environment: process.env.NODE_ENV || 'dev',
  host: process.env.HOST || 3000,
  token: process.env.WHATSAPP_TOKEN,
});
