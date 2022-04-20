import {
  Entity,
  EntityRepositoryType,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Exclude } from 'class-transformer';
import { UserRepository } from '../users.repository';

@Entity()
export class User {
  [EntityRepositoryType]?: UserRepository;

  @PrimaryKey()
  id: number;

  @Property()
  username: string;

  @Property()
  email: string;

  @Exclude()
  @Property()
  password: string;

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
