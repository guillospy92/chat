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

    const accessToken = this.configService.get('token');
    if (accessToken !== req.query['hub.verify_token']) {
      return res.status(HttpStatus.BAD_REQUEST).send('error token invalid');
    }

    return res.status(HttpStatus.OK).send(req.query['hub.challenge']);
  }
}
