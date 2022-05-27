import {
  Entity,
  EntityRepositoryType,
  Enum,
  ManyToOne,
  PrimaryKey,
  Property,
  types,
} from '@mikro-orm/core';
import { Area } from '../../areas/entities/area.entity';
import { User } from '../../users/entities/user.entity';
import { CategoryType } from '../enums/category-type.enum';
import { NotificationStatusType } from '../enums/notification-status-type.enum';
import { ReproducibleType } from '../enums/reproducible-type.enum';
import { SeverityType } from '../enums/severity-type.enum';
import { StatusType } from '../enums/status-type.enum';
import { TaskRepository } from '../tasks.repository';

@Entity({ customRepository: () => TaskRepository })
@Entity()
export class Task {
  [EntityRepositoryType]?: TaskRepository;

  @PrimaryKey()
  id: number;

  @Property()
  position: number;

  @Property()
  title: string;

  @Enum(() => SeverityType)
  priority: SeverityType;

  @Enum(() => StatusType)
  status: StatusType;

  @Enum(() => NotificationStatusType)
  notificationStatus: NotificationStatusType;

  @Enum(() => CategoryType)
  category: CategoryType;

  @Enum(() => ReproducibleType)
  reproducible: ReproducibleType;

  @Property({ nullable: true, type: types.text })
  description?: string;

  @Property({ nullable: true })
  release?: string;

  @ManyToOne({ nullable: true })
  area?: Area;

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
