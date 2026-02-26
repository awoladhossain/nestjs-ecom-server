import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';

interface UserPayload {
  sub: string;
  email: string;
  role: string;
}

interface RefreshUserPayload extends UserPayload {
  refreshToken: string;
}

interface RequestWithUser extends Request {
  user: UserPayload;
}

interface RequestWithRefresh extends Request {
  user: RefreshUserPayload;
}
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  logout(@Req() req: RequestWithUser) {
    const userId = req.user.sub;
    return this.authService.logout(userId);
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  refresh(@Req() req: RequestWithRefresh) {
    const userId = req.user.sub;
    const refreshToken = req.user.refreshToken;
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
