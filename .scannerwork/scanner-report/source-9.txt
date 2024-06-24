import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError, AxiosRequestConfig } from 'axios';
import { Logger } from 'nestjs-pino';
import { catchError, firstValueFrom } from 'rxjs';
import { MessageWhatsApp } from 'src/models-whatsapp/message.text';

@Injectable()
export class ClientHttpWhatsappService {
  private requestConfig: (type: 'JSON' | 'FORM') => AxiosRequestConfig;

  constructor(
    private readonly httpService: HttpService,
    private readonly logger: Logger,
    private readonly configService: ConfigService,
  ) {
    this.requestConfig = (type: 'JSON'): AxiosRequestConfig => {
      const baseHeaders = {
        Accept: 'application/json',
        'Content-Type':
          type === 'JSON'
            ? 'application/json'
            : 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${this.configService.get('whatsAppApiToken')}`,
      };

      return {
        baseURL: `${this.configService.get('whatsAppHost')}/${this.configService.get('whatsAppPhoneNumberId')}/`,
        headers: baseHeaders,
      };
    };
  }

  public async send(message: MessageWhatsApp) {
    return await firstValueFrom(
      this.httpService
        .post('messages', message, this.requestConfig('JSON'))
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error('error consume api whatsapp', {
              context: ClientHttpWhatsappService.name,
              cause: error.cause,
              code: error.code,
              message: error.message,
              request: error.request,
              response: error.response,
              stack: error.stack,
            });
            throw new Error('error consume api whatsapp');
          }),
        ),
    );
  }
}
