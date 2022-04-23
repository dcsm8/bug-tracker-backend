import { IsEnum, IsNotEmpty } from 'class-validator';
import { CategoryType } from '../enums/category-type.enum';
import { NotificationStatusType } from '../enums/notification-status-type.enum';
import { SeverityType } from '../enums/severity-type.enum';
import { StatusType } from '../enums/status-type.enum';

export class CreateTaskDto {
  @IsNotEmpty()
  readonly title: string;

  @IsNotEmpty()
  @IsEnum(SeverityType)
  readonly priority: SeverityType;

  @IsNotEmpty()
  @IsEnum(StatusType)
  readonly status: StatusType;

  @IsNotEmpty()
  @IsEnum(NotificationStatusType)
  readonly notificationStatus: NotificationStatusType;

  @IsNotEmpty()
  @IsEnum(CategoryType)
  readonly category: CategoryType;

  @IsNotEmpty()
  readonly shortDescription: string;

  @IsNotEmpty()
  readonly longDescription?: string;

  @IsNotEmpty()
  readonly release?: string;

  @IsNotEmpty()
  assignedToId: number;
}
