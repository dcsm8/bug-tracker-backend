import { Injectable } from '@nestjs/common';
import { wrap } from '@mikro-orm/core';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { CommentsRepository } from './comments.repository';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentsRepository: CommentsRepository,
  ) {}

  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    const entity = this.commentsRepository.create(createCommentDto);
    await this.commentsRepository.persistAndFlush(entity);
    return entity;
  }

  async findAll(): Promise<Comment[]> {
    return this.commentsRepository.findAll();
  }

  async findOne(id: number): Promise<Comment> {
    return this.commentsRepository.findOneOrFail(id);
  }

  async update(
    id: number,
    updateCommentDto: UpdateCommentDto,
  ): Promise<Comment> {
    const task = await this.commentsRepository.findOneOrFail(id);
    wrap(task).assign(updateCommentDto);
    await this.commentsRepository.flush();
    return task;
  }

  async remove(id: number): Promise<Comment> {
    const task = await this.commentsRepository.findOneOrFail(id);
    await this.commentsRepository.removeAndFlush(task);
    return task;
  }
}
