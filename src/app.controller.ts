import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  MemoryHealthIndicator,
} from '@nestjs/terminus';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth/auth.service';
import { UserService } from './user/user.service';
import { LocalAuthGuard } from './auth/guard/local-auth.guard';
import { JwtAuthGuard } from './auth/guard/jwt-auth.guard';
import { UserRegisterDTO } from './auth/auth.dto';

@Controller()
export class AppController {
  constructor(
    private health: HealthCheckService,
    private memory: MemoryHealthIndicator,
    private configService: ConfigService,
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  getInfo() {
    return {
      name: this.configService.get<string>('APP_NAME'),
      desc: this.configService.get<string>('APP_NAME') + ' API Service',
      version: 'v1',
      status: 'API Service Ready!',
    };
  }

  @Get('health')
  @HealthCheck()
  check(): Promise<any> {
    return this.health.check([
      () => this.memory.checkHeap('memory_heap', 200 * 1024 * 1024),
      () => this.memory.checkRSS('memory_rss', 3000 * 1024 * 1024),
    ]);
  }

  @Post('register')
  async signupUser(@Body() userData: UserRegisterDTO): Promise<any> {
    const user = await this.userService.createUser(userData);
    const { password, ...result } = user;
    return result;
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Request() req) {
    return req.user;
  }
}
