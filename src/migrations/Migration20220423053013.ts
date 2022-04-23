import { Migration } from '@mikro-orm/migrations';

export class Migration20220423053013 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "task" drop constraint if exists "task_priority_check";',
    );
    this.addSql(
      'alter table "task" drop constraint if exists "task_status_check";',
    );

    this.addSql(
      'alter table "task" alter column "priority" type text using ("priority"::text);',
    );
    this.addSql(
      "alter table \"task\" add constraint \"task_priority_check\" check (\"priority\" in ('none', 'low', 'normal', 'high', 'critical'));",
    );
    this.addSql(
      'alter table "task" alter column "status" type text using ("status"::text);',
    );
    this.addSql(
      "alter table \"task\" add constraint \"task_status_check\" check (\"status\" in ('backlog', 'in_progress', 'testing', 'complete'));",
    );
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "task" drop constraint if exists "task_priority_check";',
    );
    this.addSql(
      'alter table "task" drop constraint if exists "task_status_check";',
    );

    this.addSql(
      'alter table "task" alter column "priority" type text using ("priority"::text);',
    );
    this.addSql(
      "alter table \"task\" add constraint \"task_priority_check\" check (\"priority\" in ('low', 'normal', 'high', 'critical'));",
    );
    this.addSql(
      'alter table "task" alter column "status" type text using ("status"::text);',
    );
    this.addSql(
      "alter table \"task\" add constraint \"task_status_check\" check (\"status\" in ('unassigned', 'in_progress', 'testing', 'complete', 'fixed', 'wont_fix', 'cant_reproduce'));",
    );
  }
}
