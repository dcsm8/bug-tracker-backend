import {
  Entity,
  EntityRepositoryType,
  Enum,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { CategoryType } from '../enums/category-type.enum';
import { NotificationStatusType } from '../enums/notification-status-type.enum';
import { PriorityType } from '../enums/priority-type.enum';
import { StatusType } from '../enums/status-type.enum';
import { TasksRepository } from '../tasks.repository';

@Entity()
export class Task {
  [EntityRepositoryType]?: TasksRepository;

  @PrimaryKey()
  id: number;

  @Property()
  title!: string;

  @Enum(() => PriorityType)
  priority: PriorityType.LOW;

  @Enum(() => StatusType)
  status: StatusType.UNASSIGNED;

  @Enum(() => NotificationStatusType)
  notificationStatus: NotificationStatusType.NOT_NOTIFIED;

  @Enum(() => CategoryType)
  category: CategoryType.ISSUE;

  @Property()
  shortDescription!: string;

  @Property()
  longDescription?: string;

  @Property()
  release?: string;

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
