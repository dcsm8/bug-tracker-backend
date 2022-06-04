import { CommentsRepository } from './../comments.repository';
import {
  Entity,
  PrimaryKey,
  ManyToOne,
  Property,
  types,
  EntityRepositoryType,
} from '@mikro-orm/core';
import { User } from '../../users/entities/user.entity';

@Entity({ customRepository: () => CommentsRepository })
export class Comment {
  [EntityRepositoryType]?: CommentsRepository;

  @PrimaryKey()
  id: number;

  @ManyToOne()
  user: User;

  @Property({ type: types.text })
  description: string;

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  constructor(partial: Partial<Comment>) {
    Object.assign(this, partial);
  }
}
