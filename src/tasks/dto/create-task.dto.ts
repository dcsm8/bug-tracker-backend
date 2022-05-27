import { IsEnum, IsNotEmpty, IsOptional, IsPositive } from 'class-validator';
import { Area } from '../../areas/entities/area.entity';
import { User } from '../../users/entities/user.entity';
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
  readonly assignedTo: User;

  @IsOptional()
  readonly area?: Area;

  @IsOptional()
  readonly description?: string;

  @IsOptional()
  readonly release?: string;
}
