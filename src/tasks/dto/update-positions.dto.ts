import { IsPositive } from 'class-validator';

export class UpdatePositionDto {
  @IsPositive({ each: true })
  backlog: number[];

  @IsPositive({ each: true })
  in_progress: number[];

  @IsPositive({ each: true })
  testing: number[];

  @IsPositive({ each: true })
  complete: number[];
}
