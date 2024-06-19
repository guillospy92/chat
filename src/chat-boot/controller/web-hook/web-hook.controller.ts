import { Controller, Post, Req, Res } from '@nestjs/common';
import { WebHookService } from '../../services/web-hook.service';

@Controller('chat-boot')
export class WebHookController {
  constructor(private readonly webHookService: WebHookService) {}

  @Post('web-hook')
  public webHook(@Req() req: Request, @Res() res: Response) {
    try {
      this.webHookService.readMessageChatBoot(req);
    } catch (exception) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      res.status(500).send('error server');
    }
  }
}
