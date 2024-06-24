import * as process from 'process';
import { EnvConfiguration } from './app.config';

describe('TokenController', () => {
  process.env.HOST = '3002';
  it('validate config env', async () => {
    const config = EnvConfiguration();
    expect('3002').toEqual(config.host);
  });
});
