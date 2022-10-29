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
import { User } from '@prisma/client';
import { RoleService } from './role/role.service';
import { exclude } from './utils/functions';

@Controller()
export class AppController {
  constructor(
    private health: HealthCheckService,
    private memory: MemoryHealthIndicator,
    private configService: ConfigService,
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly roleService: RoleService,
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
  async signupUser(@Body() userDto: UserRegisterDTO) {
    const role = await this.roleService.getOneRole({ id: userDto.role });
    const user = await this.userService.createUser({
      name: userDto.name,
      password: userDto.password,
      username: userDto.username,
      role: { connect: { id: role.id } },
    });
    return {
      data: exclude(user, 'password', 'roleId'),
      code: 201,
      message: 'Berhasil menambah user',
    };
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req) {
    return {
      data: this.authService.login(req.user),
      message: 'Berhasil login',
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Request() req) {
    const user: User = req.user;
    return {
      data: exclude(user, 'password', 'roleId'),
      message: 'Detail User',
    };
  }

  @Get('role')
  async getRole() {
    const data = await this.roleService.getRole();
    return { data, message: 'berhasil mendapatkan data role' };
  }
}
