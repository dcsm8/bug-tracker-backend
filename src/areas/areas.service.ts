import { wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { AreasRepository } from './areas.repository';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';
import { Area } from './entities/area.entity';

@Injectable()
export class AreasService {
  constructor(
    @InjectRepository(Area) private readonly areasRepository: AreasRepository,
  ) {}

  async create(createEntityDto: CreateAreaDto): Promise<Area> {
    const entity = this.areasRepository.create(createEntityDto);
    await this.areasRepository.persistAndFlush(entity);
    return entity;
  }

  async findAll(): Promise<Area[]> {
    return this.areasRepository.findAll();
  }

  async findOne(id: number): Promise<Area> {
    return this.areasRepository.findOneOrFail(id);
  }

  async update(id: number, updateEntityDto: UpdateAreaDto): Promise<Area> {
    const task = await this.areasRepository.findOneOrFail(id);
    wrap(task).assign(updateEntityDto);
    await this.areasRepository.flush();
    return task;
  }

  async remove(id: number): Promise<Area> {
    const task = await this.areasRepository.findOneOrFail(id);
    await this.areasRepository.removeAndFlush(task);
    return task;
  }
}
