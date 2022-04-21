import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from 'src/users/entities/user.entity';
import bcrypt from 'bcryptjs';
import { AuthTokenDto } from './dto/auth-token.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    const validPassword = await bcrypt.compare(password, user.password);

    if (user && validPassword) {
      delete user.password;
      return user;
    }
    return null;
  }

  async login(user: User) {
    const tokenPayload = AuthTokenDto.fromDomain(user);

    return {
      accessToken: this.jwtService.sign(tokenPayload),
    };
  }
}
