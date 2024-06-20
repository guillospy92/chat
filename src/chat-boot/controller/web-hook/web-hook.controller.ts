import { Controller, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { WebHookService } from '../../services/web-hook.service';
import { Request, Response } from 'express';

@Controller('chat-boot')
export class WebHookController {
  constructor(private readonly webHookService: WebHookService) {}

  @Post()
  public webHook(@Res() res: Response, @Req() req: Request): void {
    try {
      this.webHookService.readMessageChatBoot(req);
      res.status(HttpStatus.OK).json([]);
    } catch (exception) {
      console.log(exception);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('error server');
    }
  }
}
