import { EntityRepository } from '@mikro-orm/postgresql';
import { Comment } from './entities/comment.entity';

export class CommentsRepository extends EntityRepository<Comment> {}
