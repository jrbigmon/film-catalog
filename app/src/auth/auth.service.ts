import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { Crypto } from '../utils/functions/crypto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findByFilter({ username });

    if (!user) {
      throw new UnauthorizedException();
    }

    if (!Crypto.compare(pass, user.getPassword())) {
      throw new UnauthorizedException();
    }

    const payload = { userId: user.getId(), username: user.getUsername() };

    const result = {
      access_token: `Bearer ` + (await this.jwtService.signAsync(payload)),
    };

    return result;
  }
}
