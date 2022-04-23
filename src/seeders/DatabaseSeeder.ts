import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { User } from '../users/entities/user.entity';

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const user = em.create(User, {
      email: 'david@test.com',
      password: '$2a$10$0myVFCJ6P8k1fW7/4lk21.N5gz.abSXQCE7QxlcU6jX7z/YUBANtO',
      username: 'david',
    });

    em.persistAndFlush(user);
  }
}
