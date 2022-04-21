import {
  Entity,
  EntityRepositoryType,
  Enum,
  ManyToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { User } from '../../users/entities/user.entity';
import { CategoryType } from '../enums/category-type.enum';
import { NotificationStatusType } from '../enums/notification-status-type.enum';
import { PriorityType } from '../enums/priority-type.enum';
import { StatusType } from '../enums/status-type.enum';
import { TaskRepository } from '../tasks.repository';

@Entity()
export class Task {
  [EntityRepositoryType]?: TaskRepository;

  @PrimaryKey()
  id: number;

  @Property()
  title: string;

  @Enum(() => PriorityType)
  priority: PriorityType;

  @Enum(() => StatusType)
  status: StatusType;

  @Enum(() => NotificationStatusType)
  notificationStatus: NotificationStatusType;

  @Enum(() => CategoryType)
  category: CategoryType;

  @Property()
  shortDescription: string;

  @Property()
  longDescription?: string;

  @Property()
  release?: string;

  @ManyToOne()
  createdBy: User;

  @ManyToOne()
  assignedTo: User;

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  constructor(partial: Partial<Task>) {
    Object.assign(this, partial);
  }
}
