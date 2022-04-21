import { Migration } from '@mikro-orm/migrations';

export class Migration20220421081427 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "task" add column "created_by_id" int not null, add column "assigned_to_id" int not null;',
    );
    this.addSql(
      'alter table "task" add constraint "task_created_by_id_foreign" foreign key ("created_by_id") references "user" ("id") on update cascade;',
    );
    this.addSql(
      'alter table "task" add constraint "task_assigned_to_id_foreign" foreign key ("assigned_to_id") references "user" ("id") on update cascade;',
    );
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "task" drop constraint "task_created_by_id_foreign";',
    );
    this.addSql(
      'alter table "task" drop constraint "task_assigned_to_id_foreign";',
    );

    this.addSql('alter table "task" drop column "created_by_id";');
    this.addSql('alter table "task" drop column "assigned_to_id";');
  }
}
