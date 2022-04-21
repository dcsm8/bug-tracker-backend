import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Task } from './entities/task.entity';
import { User } from '../users/entities/user.entity';

@Module({
  controllers: [TasksController],
  providers: [TasksService],
  imports: [MikroOrmModule.forFeature({ entities: [Task, User] })],
})
export class TasksModule {}
