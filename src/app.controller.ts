import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  UseGuards,
  Req,
  Res,
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
import { Request, Response } from 'express';
import { Role } from './utils/constants';

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
  async login(@Req() req: Request & { user: User }, @Res() res: Response) {
    const token: string = await this.authService.getJwtToken(req.user);
    const now = new Date();
    const time = now.getTime();
    now.setTime(time + 24 * 60 * 60 * 1000);
    res
      .cookie('auth-cookie', token, {
        httpOnly: true,
        expires: now,
      })
      .json({ code: 200, message: 'Berhasil login', data: { token } });
  }

  @UseGuards(JwtAuthGuard)
  @Delete('logout')
  async logout(@Res() res: Response) {
    res
      .cookie('auth-cookie', '', { expires: new Date() })
      .json({ code: 200, message: 'Berhasil logout' });
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Req() req: Request & { user: User }) {
    const user: User = req.user;
    return {
      data: exclude(user, 'password', 'roleId'),
      message: 'Detail User',
    };
  }

  @Get('role')
  async getRole() {
    const data = await this.roleService.getRole({
      NOT: {
        id: Role.ADMIN,
      },
    });
    return { data, message: 'berhasil mendapatkan data role' };
  }
}
