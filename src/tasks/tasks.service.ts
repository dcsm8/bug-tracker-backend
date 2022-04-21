import { wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { TaskRepository } from './tasks.repository';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private readonly taskRepository: TaskRepository,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const entity = this.taskRepository.create(createTaskDto);
    await this.taskRepository.persistAndFlush(entity);
    return entity;
  }

  findAll() {
    return this.taskRepository.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.taskRepository.findOneOrFail(id);
    wrap(task).assign(updateTaskDto);
    await this.taskRepository.flush();
    return task;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
