import { IsNotEmpty } from 'class-validator';

export class CreateAreaDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly color: string;
}
