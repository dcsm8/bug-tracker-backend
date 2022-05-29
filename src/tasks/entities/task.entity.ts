import {
  Entity,
  EntityRepositoryType,
  Enum,
  ManyToOne,
  PrimaryKey,
  Property,
  types,
} from '@mikro-orm/core';
import { IsPositive } from 'class-validator';
import { Area } from '../../areas/entities/area.entity';
import { User } from '../../users/entities/user.entity';
import { CategoryType } from '../enums/category-type.enum';
import { ReproducibleType } from '../enums/reproducible-type.enum';
import { SeverityType } from '../enums/severity-type.enum';
import { StatusType } from '../enums/status-type.enum';
import { TaskRepository } from '../tasks.repository';

@Entity({ customRepository: () => TaskRepository })
@Entity()
export class Task {
  [EntityRepositoryType]?: TaskRepository;

  @IsPositive()
  @PrimaryKey()
  id: number;

  @Property()
  position: number;

  @Property()
  title: string;

  @ManyToOne()
  createdBy: User;

  @Enum(() => StatusType)
  status: StatusType;

  @Enum({ items: () => SeverityType, nullable: true })
  priority?: SeverityType;

  @Enum({ items: () => CategoryType, nullable: true })
  category?: CategoryType;

  @Enum({ items: () => ReproducibleType, nullable: true })
  reproducible?: ReproducibleType;

  @Property({ nullable: true, type: types.text })
  description?: string;

  @ManyToOne({ nullable: true })
  area?: Area;

  @ManyToOne({ nullable: true })
  assignedTo?: User;

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  constructor(partial: Partial<Task>) {
    Object.assign(this, partial);
  }
}
