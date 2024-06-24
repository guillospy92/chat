import { HttpService } from '@nestjs/axios';
import { ClientHttpWhatsappService } from './client-http-whatsapp';
import MockAdapter from 'axios-mock-adapter';
import { appModuloTesting } from '../../app-test.module';
import { HttpStatus } from '@nestjs/common';

describe('WebHookService', () => {
  let service: ClientHttpWhatsappService;
  let httpService: HttpService;
  let mockHttp: MockAdapter;

  beforeEach(async () => {
    const module = await appModuloTesting.compile();
    // https://dev.to/shubham_kadam/nestjs-mocking-databases-for-efficient-tests-3efl

    service = module.get<ClientHttpWhatsappService>(ClientHttpWhatsappService);
    httpService = module.get<HttpService>(HttpService);
    mockHttp = new MockAdapter(httpService.axiosRef);
  });

  it('call api whatsApp ok', async () => {
    mockHttp
      .onPost('www.whatsapp.com/0000/messages')
      .reply(HttpStatus.OK, { data: 'some data' });

    const data = await service.send(null);
    expect(HttpStatus.OK).toEqual(data.status);
  });

  it('call api whatsApp failed', async () => {
    mockHttp
      .onPost('www.whatsapp.com/0000/messages')
      .reply(HttpStatus.INTERNAL_SERVER_ERROR, {
        data: 'error consume api whatsApp',
      });

    await expect(async () => {
      await service.send(null);
    }).rejects.toThrow(Error);
  });
});
