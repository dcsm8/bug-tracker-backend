import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateAreaDto {
  @IsNotEmpty()
  readonly name: string;

  @IsOptional()
  @IsNotEmpty()
  readonly color?: string;
}
