import { Injectable } from '@nestjs/common';

@Injectable()
export class WebHookService {
  public readMessageChatBoot(request: any) {
    console.log('read message chat boot body', request.body);
    console.log('read message chat boot query', request.query);
    console.log('read message chat boot params', request.params);
  }
}
