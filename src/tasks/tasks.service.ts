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
    const { sourceColumn, destinationColumn } = updatePositionDto;

    const sourceColumnTasks = await this.taskRepository.getTasksWhereId(
      updatePositionDto[sourceColumn],
    );

    sourceColumnTasks.forEach((task, index) => {
      task.position = index;
      task.status = StatusType[sourceColumn.toUpperCase()];
    });

    if (sourceColumn !== destinationColumn) {
      const destinationColumnTasks = await this.taskRepository.getTasksWhereId(
        updatePositionDto[destinationColumn],
      );

      destinationColumnTasks.forEach((task, index) => {
        task.position = index;
        task.status = StatusType[destinationColumn.toUpperCase()];
      });
    }

    await this.taskRepository.flush();
  }
}
