import { JoiValidationSchema } from './joi.validation';

describe('JoiValidation', () => {
  it('validate joi object success', async () => {
    const { error } = JoiValidationSchema.validate({
      WHATSAPP_TOKEN: 'token',
      PORT: 3001,
      WHATSAPP_HOST: 'token_host',
      WHATSAPP_API_TOKEN: 'token_api',
      WHATSAPP_ACCOUNT_ID: 'token_account_id',
      WHATSAPP_PHONE_NUMBER_ID: 'number_id',
    });
    expect(error).toEqual(undefined);
  });
});
