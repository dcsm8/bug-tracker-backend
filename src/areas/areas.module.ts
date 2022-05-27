import { Module } from '@nestjs/common';
import { AreasService } from './areas.service';
import { AreasController } from './areas.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Area } from './entities/area.entity';

@Module({
  controllers: [AreasController],
  providers: [AreasService],
  imports: [MikroOrmModule.forFeature({ entities: [Area] })],
  exports: [AreasService],
})
export class AreasModule {}
