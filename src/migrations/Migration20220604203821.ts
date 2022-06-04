import { Migration } from '@mikro-orm/migrations';

export class Migration20220604203821 extends Migration {
  async up(): Promise<void> {
    this.addSql('alter table "comment" add column "task_id" int not null;');
    this.addSql(
      'alter table "comment" add constraint "comment_task_id_foreign" foreign key ("task_id") references "task" ("id") on update cascade;',
    );
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "comment" drop constraint "comment_task_id_foreign";',
    );

    this.addSql('alter table "comment" drop column "task_id";');
  }
}
