import {
  Entity,
  EntityRepositoryType,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { ApiHideProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { UserRepository } from '../users.repository';

@Entity({ customRepository: () => UserRepository })
export class User {
  [EntityRepositoryType]?: UserRepository;

  @PrimaryKey()
  id: number;

  @Property()
  username: string;

  @Property()
  fullName: string;

  @Property()
  email: string;

  @Exclude()
  @Property()
  @ApiHideProperty()
  password: string;

  @Exclude()
  @Property()
  createdAt: Date = new Date();

  @Exclude()
  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
