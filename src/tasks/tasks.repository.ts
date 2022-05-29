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

  public async getTasksWhereId(ids: number[]): Promise<Task[]> {
    const listTasks = await this.em.qb(Task).select('*').where({ id: ids });
    return this.sortBy(listTasks, ids);
  }

  public sortBy(listTasks: Task[], sortList: number[]): Task[] {
    return listTasks.sort((a, b) => {
      return sortList.indexOf(a.id) - sortList.indexOf(b.id);
    });
  }
}
