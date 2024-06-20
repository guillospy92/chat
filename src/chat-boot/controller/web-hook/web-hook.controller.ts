import { Controller, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { WebHookService } from '../../services/web-hook.service';
import { Logger } from 'nestjs-pino';
import { Request, Response } from 'express';

@Controller('chat-boot')
export class WebHookController {
  constructor(
    private readonly webHookService: WebHookService,
    private readonly logger: Logger,
  ) {}

  @Post()
  public webHook(@Res() res: Response, @Req() req: Request): void {
    try {
      this.logger.log('init web hok controller', {
        context: WebHookController.name,
        body: req.body,
        query: req.query,
        params: req.params,
        header: req.headers,
      });
      this.webHookService.readMessageChatBoot(req);
      res.status(HttpStatus.OK).json([]);
    } catch (exception) {
      console.log(exception);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('error server');
    }
  }
}
