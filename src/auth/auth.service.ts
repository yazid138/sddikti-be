import { UserService } from 'src/user/user.service';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<User | null> {
    const user = await this.userService.user({ email });
    if (user && (await this.comparePassword(pass, user.password))) {
      return user;
    }
    return null;
  }

  login(user: { id: string }): any {
    const payload = { id: user.id };
    return {
      type: 'bearer',
      token: this.jwtService.sign(payload),
    };
  }

  async getJwtToken(user: User): Promise<string> {
    const payload = { id: user.id };
    return await this.jwtService.signAsync(payload);
  }

  private async comparePassword(pass: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(pass, hash);
  }
}
