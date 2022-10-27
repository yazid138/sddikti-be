import { UserService } from 'src/user/user.service';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any | null> {
    const user = await this.userService.user({ username });
    if (user && (await this.comparePassword(pass, user.password))) {
      const { password, ...result } = user;
      return result;
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

  async comparePassword(pass: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(pass, hash);
  }
}
