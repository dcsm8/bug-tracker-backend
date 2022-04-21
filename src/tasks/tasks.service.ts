import { wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { AuthTokenDto } from '../auth/dto/auth-token.dto';
import { User } from '../users/entities/user.entity';
import { UserRepository } from '../users/users.repository';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { TaskRepository } from './tasks.repository';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private readonly taskRepository: TaskRepository,
    @InjectRepository(User) private readonly userRepository: UserRepository,
  ) {}

  async create(
    createTaskDto: CreateTaskDto,
    user: AuthTokenDto,
  ): Promise<Task> {
    const assignedToId = createTaskDto.assignedToId;
    delete createTaskDto.assignedToId;

    const task = new Task(createTaskDto);
    const userAssigned = await this.userRepository.findOneOrFail(assignedToId);

    let owner: User;

    if (user.keyId === assignedToId) {
      owner = userAssigned;
    } else {
      owner = await this.userRepository.findOneOrFail(user.keyId);
    }

    task.assignedTo = userAssigned;
    task.createdBy = owner;

    const entity = this.taskRepository.create(task);
    await this.taskRepository.persistAndFlush(entity);
    return entity;
  }

  async findAll(): Promise<Task[]> {
    return this.taskRepository.findAll();
  }

  async findOne(id: number): Promise<Task> {
    return this.taskRepository.findOneOrFail(id);
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.taskRepository.findOneOrFail(id);
    wrap(task).assign(updateTaskDto);
    await this.taskRepository.flush();
    return task;
  }

  async remove(id: number): Promise<Task> {
    const task = await this.taskRepository.findOneOrFail(id);
    await this.taskRepository.removeAndFlush(task);
    return task;
  }
}
