import { Migration } from '@mikro-orm/migrations';

export class Migration20220605025730 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "comment" drop constraint "comment_task_id_foreign";',
    );

    this.addSql(
      'alter table "comment" add constraint "comment_task_id_foreign" foreign key ("task_id") references "task" ("id") on update cascade on delete cascade;',
    );
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "comment" drop constraint "comment_task_id_foreign";',
    );

    this.addSql(
      'alter table "comment" add constraint "comment_task_id_foreign" foreign key ("task_id") references "task" ("id") on update cascade;',
    );
  }
}
