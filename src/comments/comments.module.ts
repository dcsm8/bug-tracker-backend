import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { Comment } from './entities/comment.entity';

@Module({
  controllers: [CommentsController],
  exports: [CommentsService],
  imports: [MikroOrmModule.forFeature({ entities: [Comment] })],
  providers: [CommentsService],
})
export class CommentsModule {}
