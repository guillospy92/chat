import { Module } from '@nestjs/common';
import { TokenController } from './controllers/token/token.controller';
import { WebHookController } from './controllers/web-hook/web-hook.controller';
import { ClientHttpWhatsappService } from './services/client-http-whatsapp';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import SendTextMessageStrategy from './services/strategies/send-text-message';
import { TEXT_MESSAGE, WebHookMessage } from './services/strategies/contract';

@Module({
  imports: [ConfigModule, HttpModule],
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
})
export class ChatBootModule {}
