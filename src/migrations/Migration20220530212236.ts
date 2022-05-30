import { Migration } from '@mikro-orm/migrations';

export class Migration20220530212236 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "task" drop constraint if exists "task_priority_check";',
    );

    this.addSql(
      'alter table "task" alter column "priority" type text using ("priority"::text);',
    );
    this.addSql(
      'alter table "task" add constraint "task_priority_check" check ("priority" in (\'low\', \'mid\', \'high\'));',
    );
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "task" drop constraint if exists "task_priority_check";',
    );

    this.addSql(
      'alter table "task" alter column "priority" type text using ("priority"::text);',
    );
    this.addSql(
      "alter table \"task\" add constraint \"task_priority_check\" check (\"priority\" in ('none', 'low', 'normal', 'high', 'critical'));",
    );
  }
}
