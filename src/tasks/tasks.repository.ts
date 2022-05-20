import { User } from 'src/users/entities/user.entity';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Task } from './entities/task.entity';
import { StatusType } from './enums/status-type.enum';

export class TaskRepository extends EntityRepository<Task> {
  public async getBacklogLastPosition(user: User): Promise<number> {
    return this.em
      .qb(Task)
      .count()
      .where({ status: StatusType.BACKLOG, assignedTo: user.id });
  }
}
