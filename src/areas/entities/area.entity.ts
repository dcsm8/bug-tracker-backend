import {
  Entity,
  EntityRepositoryType,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Exclude } from 'class-transformer';
import { AreasRepository } from '../areas.repository';

@Entity({ customRepository: () => AreasRepository })
@Entity()
export class Area {
  [EntityRepositoryType]?: AreasRepository;

  @PrimaryKey()
  id: number;

  @Property()
  name: string;

  @Property({ nullable: true })
  color?: string;

  @Exclude()
  @Property()
  createdAt: Date = new Date();

  @Exclude()
  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
