import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { LoggerModule } from 'nestjs-pino';
import { ClientHttpWhatsappService } from './chat-boot/services/client-http-whatsapp';
import { TokenController } from './chat-boot/controllers/token/token.controller';
import { WebHookController } from './chat-boot/controllers/web-hook/web-hook.controller';
import SendTextMessageStrategy from './chat-boot/services/strategies/send-text-message';
import {
  TEXT_MESSAGE,
  WebHookMessage,
} from './chat-boot/services/strategies/contract';
import { ChatBootModule } from './chat-boot/chat-boot.module';

export const ImportsTest = [
  ChatBootModule,
  LoggerModule.forRoot({
    pinoHttp: {
      autoLogging: false,
    },
  }),
  HttpModule,
  ConfigModule.forRoot({
    load: [
      () => ({
        host: '7000',
        environment: 'test',
        token: 'token',
        whatsAppHost: 'www.whatsapp.com',
        whatsAppApiToken: 'api_token',
        whatsAppAccountId: '0000',
        whatsAppPhoneNumberId: '0000',
      }),
    ],
  }),
];

export const appModuloTesting = Test.createTestingModule({
  imports: ImportsTest,
  controllers: [TokenController, WebHookController],
  providers: [
    ClientHttpWhatsappService,
    SendTextMessageStrategy,
    {
      provide: 'STRATEGIES',
      useFactory: (sendTextMessageStrategy: SendTextMessageStrategy) => {
        const strategyMap = new Map<string, WebHookMessage>();
        strategyMap.set(TEXT_MESSAGE, sendTextMessageStrategy);
        return strategyMap;
      },
      inject: [SendTextMessageStrategy],
    },
  ],
});
