import { UpdatePositionDto } from './dto/update-positions.dto';
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
import { StatusType } from './enums/status-type.enum';
import { AreasRepository } from '../areas/areas.repository';
import { Area } from '../areas/entities/area.entity';

@Injectable()
export class TasksService {
  constructor(
    private readonly taskRepository: TaskRepository,
    @InjectRepository(User) private readonly userRepository: UserRepository,
    @InjectRepository(Area) private readonly areasRepository: AreasRepository,
  ) {}

  async create(
    createTaskDto: CreateTaskDto,
    user: AuthTokenDto,
  ): Promise<Task> {
    const task = new Task(createTaskDto);

    if (createTaskDto.areaId) {
      task.area = await this.areasRepository.findOneOrFail(
        createTaskDto.areaId,
      );
    }

    if (createTaskDto.assignedToId) {
      task.assignedTo = await this.userRepository.findOneOrFail(
        createTaskDto.assignedToId,
      );
    }

    task.createdBy = await this.userRepository.findOneOrFail(user.keyId);

    task.position = await this.taskRepository.getBacklogLastPosition(
      task.createdBy,
    );

    task.status = StatusType.BACKLOG;

    const entity = this.taskRepository.create(task);
    await this.taskRepository.persistAndFlush(entity);

    return entity;
  }

  async findAll(): Promise<Task[]> {
    return this.taskRepository.findAll({
      populate: ['createdBy', 'assignedTo', 'area'],
    });
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

  async updatePositions(updatePositionDto: UpdatePositionDto): Promise<any> {
    for (const [index, value] of updatePositionDto.backlog.entries()) {
      const task = await this.taskRepository.findOneOrFail(value);
      task.position = index;
      task.status = StatusType.BACKLOG;
    }

    for (const [index, value] of updatePositionDto.in_progress.entries()) {
      const task = await this.taskRepository.findOneOrFail(value);
      task.position = index;
      task.status = StatusType.IN_PROGRESS;
    }

    for (const [index, value] of updatePositionDto.testing.entries()) {
      const task = await this.taskRepository.findOneOrFail(value);
      task.position = index;
      task.status = StatusType.TESTING;
    }

    for (const [index, value] of updatePositionDto.complete.entries()) {
      const task = await this.taskRepository.findOneOrFail(value);
      task.position = index;
      task.status = StatusType.COMPLETE;
    }

    await this.taskRepository.flush();
  }
}
