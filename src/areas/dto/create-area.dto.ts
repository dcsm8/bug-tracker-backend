import { IsHexColor, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAreaDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsHexColor()
  readonly color?: string;
}
