import { Migration } from '@mikro-orm/migrations';

export class Migration20220527060601 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "area" ("id" serial primary key, "name" varchar(255) not null, "color" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);',
    );
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "area" cascade;');
  }
}
