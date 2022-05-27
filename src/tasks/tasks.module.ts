import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Task } from './entities/task.entity';
import { User } from '../users/entities/user.entity';
import { Area } from '../areas/entities/area.entity';

@Module({
  controllers: [TasksController],
  exports: [TasksService],
  imports: [MikroOrmModule.forFeature({ entities: [Task, User, Area] })],
  providers: [TasksService],
})
export class TasksModule {}
