import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';
import { Request } from 'express';
import { RequestContext } from '@medibloc/nestjs-request-context';
import { MyContext } from 'src/common/context/my-context';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService,
    readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy.extractJWT,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('APP_KEY'),
    });
  }

  private static extractJWT(req: Request): string | null {
    if (req.cookies && req.cookies['auth-cookie']) {
      return req.cookies['auth-cookie'];
    }
    return null;
  }

  async validate(payload: { id: string }): Promise<User> {
    const user = await this.userService.user({ id: payload.id });
    const ctx = RequestContext.get<MyContext>();
    ctx.user = user;
    return user;
  }
}
