import { Module } from '@nestjs/common';
import { ChatBootModule } from './chat-boot/chat-boot.module';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration } from './config/app.config';
import { JoiValidationSchema } from './config/joi.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfiguration],
      validationSchema: JoiValidationSchema,
    }),
    ChatBootModule,
  ],
})
export class AppModule {}
