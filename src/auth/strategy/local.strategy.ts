import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { HttpStatus } from '@nestjs/common/enums';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new HttpException(
        'username atau password salah',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return user;
  }
}
