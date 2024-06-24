import { Injectable } from '@nestjs/common';
import { WebHookMessage } from './contract';
import { WhatsAppRequestDto } from 'src/dtos/whatsapp-request';
import { ClientHttpWhatsappService } from '../client-http-whatsapp';
import { MessageTextSimple } from 'src/models-whatsapp/message.text';

@Injectable()
export default class SendTextMessageStrategy implements WebHookMessage {
  constructor(private readonly clientHttp: ClientHttpWhatsappService) {}
  async sendMessage(whatsAppRequestDto: WhatsAppRequestDto) {
    const message = `hola ${whatsAppRequestDto.entry[0].changes[0].value.contacts[0].profile.name} vale monda`;
    const messageText: MessageTextSimple = {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: whatsAppRequestDto.entry[0].changes[0].value.messages[0].from,
      type: 'text',
      text: {
        preview_url: false,
        body: message,
      },
    };

    return await this.clientHttp.send(messageText);
  }
}
