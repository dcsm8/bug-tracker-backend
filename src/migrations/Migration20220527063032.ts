import { Migration } from '@mikro-orm/migrations';

export class Migration20220527063032 extends Migration {
  async up(): Promise<void> {
    this.addSql('alter table "task" add column "area_id" int null;');
    this.addSql(
      'alter table "task" add constraint "task_area_id_foreign" foreign key ("area_id") references "area" ("id") on update cascade on delete set null;',
    );
  }

  async down(): Promise<void> {
    this.addSql('alter table "task" drop constraint "task_area_id_foreign";');

    this.addSql('alter table "task" drop column "area_id";');
  }
}
