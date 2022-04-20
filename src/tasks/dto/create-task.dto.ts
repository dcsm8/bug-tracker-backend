import { CategoryType } from '../enums/category-type.enum';
import { NotificationStatusType } from '../enums/notification-status-type.enum';
import { PriorityType } from '../enums/priority-type.enum';
import { StatusType } from '../enums/status-type.enum';

export class CreateTaskDto {
  readonly title: string;
  readonly priority: PriorityType;
  readonly status: StatusType;
  readonly notificationStatus: NotificationStatusType;
  readonly category: CategoryType;
  readonly shortDescription: string;
  readonly longDescription?: string;
  readonly release?: string;
}
