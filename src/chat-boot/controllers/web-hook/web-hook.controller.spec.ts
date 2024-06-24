import { HttpService } from '@nestjs/axios';
import MockAdapter from 'axios-mock-adapter';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';
import { appModuloTesting } from '../../../app-test.module';
import * as supertest from 'supertest';

const request = {
  entry: [
    {
      changes: [
        {
          value: {
            contacts: [
              {
                profile: {
                  name: 'Guillermo romo',
                },
              },
            ],
            messages: [
              {
                from: '573015076168',
                type: 'text',
              },
            ],
          },
        },
      ],
    },
  ],
};

describe('WebHookController', () => {
  let httpService: HttpService;
  let mockHttp: MockAdapter;
  let module: TestingModule;
  let app: INestApplication;

  beforeEach(async () => {
    // https://dev.to/shubham_kadam/nestjs-mocking-databases-for-efficient-tests-3efl
    module = await appModuloTesting.compile();
    app = await module.createNestApplication();
    await app.init();
    httpService = module.get<HttpService>(HttpService);
    mockHttp = new MockAdapter(httpService.axiosRef);
  });

  afterEach(async () => {
    await app.close();
  });

  it('controller webhook ok', async () => {
    mockHttp
      .onPost('www.whatsapp.com/0000/messages')
      .reply(HttpStatus.OK, { data: 'some data' });
    await supertest(app.getHttpServer())
      .post('/chat-boot')
      .send(request)
      .expect(HttpStatus.OK);

    const data: any = JSON.parse(
      mockHttp.history.post[mockHttp.history.post.length - 1].data,
    );

    expect(request.entry[0].changes[0].value.messages[0].from).toEqual(data.to);
  });

  it('controller webhook failed service whatsapp', async () => {
    mockHttp
      .onPost('www.whatsapp.com/0000/messages')
      .reply(HttpStatus.INTERNAL_SERVER_ERROR, { data: 'some data' });
    await supertest(app.getHttpServer())
      .post('/chat-boot')
      .send(request)
      .expect(HttpStatus.OK);
  });
});
