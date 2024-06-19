import { Module } from '@nestjs/common';
import { TokenController } from './controller/token/token.controller';
import { WebHookController } from './controller/web-hook/web-hook.controller';
import { WebHookService } from './services/web-hook.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [TokenController, WebHookController],
  providers: [WebHookService],
})
export class ChatBootModule {}
