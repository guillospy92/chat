import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller('chat-boot')
export class TokenController {
  constructor(private readonly configService: ConfigService) {}
  @Get('verify/token')
  verifyToken(): string[] {
    console.log(this.configService.get('token'));
    return ['token', 'other_token'];
  }
}
