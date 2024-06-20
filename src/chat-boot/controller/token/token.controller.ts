import { Controller, Get, HttpStatus, Req, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';
import { Request, Response } from 'express';

@Controller('chat-boot')
export class TokenController {
  constructor(
    private readonly configService: ConfigService,
    private readonly logger: Logger,
  ) {}

  @Get()
  verifyToken(@Res() res: Response, @Req() req: Request) {
    this.logger.log('init request token controller', {
      context: TokenController.name,
      body: req.body,
      query: req.query,
      params: req.params,
      header: req.headers,
    });

    try {
      const accessToen = this.configService.get('token');
      if (accessToen !== req.query['hub.verify_token']) {
        return res.status(HttpStatus.BAD_REQUEST).send('error token invalid');
      }

      return res.status(HttpStatus.ACCEPTED).send(req.query['hub.challenge']);
    } catch (exception) {
      return res.status(HttpStatus.BAD_REQUEST).send('error token invalid');
    }
  }
}
