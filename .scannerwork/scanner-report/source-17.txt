import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ChatBootModule } from './chat-boot/chat-boot.module';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration } from './config/app.config';
import { JoiValidationSchema } from './config/joi.validation';
import { LoggerModule } from 'nestjs-pino';
import {
  CORRELATION_ID_HEADER,
  CorrelationMiddleware,
} from './middlewares/correlation/correlation.middleware';
import { Request } from 'express';

@Module({
  imports: [
    ChatBootModule,
    LoggerModule.forRoot({
      pinoHttp: {
        formatters: {
          level: (label) => {
            return { level: label.toUpperCase() };
          },
        },
        messageKey: 'message',
        level: 'info',
        customProps: (req: Request) => {
          return {
            correlationID: req[CORRELATION_ID_HEADER],
          };
        },
        serializers: {
          req: () => undefined,
          res: () => undefined,
        },
        timestamp: () => `,"timestamp":"${new Date(Date.now()).toISOString()}"`,
      },
    }),
    ConfigModule.forRoot({
      load: [EnvConfiguration],
      validationSchema: JoiValidationSchema,
    }),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorrelationMiddleware).forRoutes('*');
  }
}
