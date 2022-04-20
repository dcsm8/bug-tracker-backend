import { Controller, UseGuards, Request, Get } from '@nestjs/common';

import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Get('testing')
  getTest(@Request() req) {
    return 'test';
  }
}
