import { EntityRepository } from '@mikro-orm/postgresql';
import { Area } from './entities/area.entity';

export class AreasRepository extends EntityRepository<Area> {}
