import { WhatsAppRequestDto } from 'src/dtos/whatsapp-request';

export const TEXT_MESSAGE = 'text';

export interface WebHookMessage {
  sendMessage(whatsAppRequestDto: WhatsAppRequestDto);
}
