import { Enum } from '@mikro-orm/core';
import { IsPositive } from 'class-validator';
import { StatusType } from '../enums/status-type.enum';

export class UpdatePositionDto {
  @IsPositive({ each: true })
  backlog: number[];

  @IsPositive({ each: true })
  in_progress: number[];

  @IsPositive({ each: true })
  testing: number[];

  @IsPositive({ each: true })
  complete: number[];

  @Enum(() => StatusType)
  sourceColumn: StatusType;

  @Enum(() => StatusType)
  destinationColumn: StatusType;
}
