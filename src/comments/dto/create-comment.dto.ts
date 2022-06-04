import { IsPositive, IsString } from 'class-validator';
export class CreateCommentDto {
  @IsPositive()
  readonly user: number;

  @IsPositive()
  readonly task: number;

  @IsString()
  readonly text: string;
}
