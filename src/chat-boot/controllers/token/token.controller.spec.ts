import { HttpStatus, INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import * as supertest from 'supertest';
import { AppModule } from '../../../app.module';
import { ImportsTest } from '../../../app-test.module';

describe('TokenController', () => {
  let module: TestingModule;
  let app: INestApplication;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule, ...ImportsTest],
    }).compile();
    app = await module.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('token controller validate token ok', async () => {
    return supertest(app.getHttpServer())
      .get('/chat-boot')
      .query({ 'hub.verify_token': 'token', 'hub.challenge': 'challenge' })
      .expect(HttpStatus.OK)
      .expect((response) => expect('challenge').toEqual(response.text));
  });

  it('token controller invalid token', async () => {
    return supertest(app.getHttpServer())
      .get('/chat-boot')
      .expect(HttpStatus.BAD_REQUEST)
      .expect((response) =>
        expect('error token invalid').toEqual(response.text),
      );
  });
});
