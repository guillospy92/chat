export interface Language {
  code: string;
}

export interface Template {
  name: string;
  language: Language;
}

export interface Text {
  preview_url: boolean;
  body: string;
}

export interface MessageTemplateHelloWorld {
  messaging_product: string;
  to: string;
  type: string;
  template: Template;
}

export interface MessageTextSimple {
  messaging_product: string;
  recipient_type: string;
  to: string;
  type: string;
  text: Text;
}

export type MessageWhatsApp = MessageTemplateHelloWorld | MessageTextSimple;
