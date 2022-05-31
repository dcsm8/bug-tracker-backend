import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { User } from '../../users/entities/user.entity';

export class AuthTokenDto {
  @IsNotEmpty()
  @IsNumber()
  keyId: number;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  fullName: string;

  static fromDomain(user: User): object {
    const tokenPayload = new AuthTokenDto();
    tokenPayload.keyId = user.id;
    tokenPayload.email = user.email;
    tokenPayload.username = user.username;
    tokenPayload.fullName = user.fullName;

    return Object.assign({}, tokenPayload);
  }
}
