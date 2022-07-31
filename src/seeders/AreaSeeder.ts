import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Area } from '../areas/entities/area.entity';

export class AreaSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const list = [
      'None',
      'Security',
      'Crash/Hang',
      'Data loss',
      'Performance',
      'UI/Usability',
      'Other bug',
      'Feature(New)',
      'Enhancement',
    ];

    for (const item of list) {
      em.create(Area, {
        name: item,
      });
    }
  }
}
