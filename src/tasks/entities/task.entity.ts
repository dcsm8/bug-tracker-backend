import {
  Collection,
  Entity,
  EntityRepositoryType,
  Enum,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
  types,
} from '@mikro-orm/core';
import { Area } from '../../areas/entities/area.entity';
import { Comment } from '../../comments/entities/comment.entity';
import { User } from '../../users/entities/user.entity';
import { CategoryType } from '../enums/category-type.enum';
import { ReproducibleType } from '../enums/reproducible-type.enum';
import { SeverityType } from '../enums/severity-type.enum';
import { StatusType } from '../enums/status-type.enum';
import { TaskRepository } from '../tasks.repository';

@Entity({ customRepository: () => TaskRepository })
export class Task {
  [EntityRepositoryType]?: TaskRepository;

  @PrimaryKey()
  id: number;

  @Property()
  position: number;

  @Property()
  title: string;

  @ManyToOne()
  createdBy: User;

  @OneToMany(() => Comment, (comment) => comment.task)
  comments = new Collection<Comment>(this);

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
