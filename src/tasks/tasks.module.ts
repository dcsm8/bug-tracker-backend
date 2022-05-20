import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Task } from './entities/task.entity';
import { User } from '../users/entities/user.entity';

@Module({
  controllers: [TasksController],
  exports: [TasksService],
  imports: [MikroOrmModule.forFeature({ entities: [Task, User] })],
  providers: [TasksService],
})
export class TasksModule {}
