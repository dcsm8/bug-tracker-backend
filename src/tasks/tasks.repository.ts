import { EntityRepository } from '@mikro-orm/postgresql';
import { Task } from './entities/task.entity';

export class TasksRepository extends EntityRepository<Task> {}
