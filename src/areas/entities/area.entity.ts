import {
  Entity,
  EntityRepositoryType,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { AreasRepository } from '../areas.repository';

@Entity({ customRepository: () => AreasRepository })
export class Area {
  [EntityRepositoryType]?: AreasRepository;

  @PrimaryKey()
  id: number;

  @Property()
  name: string;

  @Property({ nullable: true })
  color?: string;

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
