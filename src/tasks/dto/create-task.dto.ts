import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { CategoryType } from '../enums/category-type.enum';
import { NotificationStatusType } from '../enums/notification-status-type.enum';
import { ReproducibleType } from '../enums/reproducible-type.enum';
import { SeverityType } from '../enums/severity-type.enum';
import { StatusType } from '../enums/status-type.enum';

export class CreateTaskDto {
  @IsNotEmpty()
  readonly title: string;

  @IsEnum(SeverityType)
  readonly priority: SeverityType;

  @IsEnum(StatusType)
  readonly status: StatusType;

  @IsEnum(NotificationStatusType)
  readonly notificationStatus: NotificationStatusType;

  @IsEnum(CategoryType)
  readonly category: CategoryType;

  @IsEnum(ReproducibleType)
  readonly reproducible: ReproducibleType;

  @IsNotEmpty()
  readonly description: string;

  @IsNumber()
  assignedToId: number;

  @IsOptional()
  readonly release?: string;
}
