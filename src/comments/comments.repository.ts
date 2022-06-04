import { EntityRepository } from '@mikro-orm/postgresql';

export class CommentsRepository extends EntityRepository<Comment> {}
