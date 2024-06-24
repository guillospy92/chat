class TextMessageDto {
  body: string;
}

class MessageDto {
  from: string;
  id: string;
  timestamp: string;
  text: TextMessageDto;
  type: string;
}

class ContactProfileDto {
  name: string;
}

class ContactDto {
  profile: ContactProfileDto;
  wa_id: string;
}

class MetadataDto {
  display_phone_number: string;
  phone_number_id: string;
}

class ChangeValueDto {
  messaging_product: string;
  metadata: MetadataDto;
  contacts: ContactDto[];
  messages: MessageDto[];
}

class ChangeDto {
  value: ChangeValueDto;
  field: string;
}

class EntryDto {
  id: string;
  changes: ChangeDto[];
}

export class WhatsAppRequestDto {
  object: string;
  entry: EntryDto[];
}
