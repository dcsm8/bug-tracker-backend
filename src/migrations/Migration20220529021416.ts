import { Migration } from '@mikro-orm/migrations';

export class Migration20220529021416 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "task" drop constraint if exists "task_priority_check";',
    );
    this.addSql(
      'alter table "task" drop constraint if exists "task_category_check";',
    );
    this.addSql(
      'alter table "task" drop constraint if exists "task_reproducible_check";',
    );

    this.addSql(
      'alter table "task" drop constraint "task_assigned_to_id_foreign";',
    );

    this.addSql(
      'alter table "task" alter column "priority" type text using ("priority"::text);',
    );
    this.addSql(
      "alter table \"task\" add constraint \"task_priority_check\" check (\"priority\" in ('none', 'low', 'normal', 'high', 'critical'));",
    );
    this.addSql('alter table "task" alter column "priority" drop not null;');
    this.addSql(
      'alter table "task" alter column "category" type text using ("category"::text);',
    );
    this.addSql(
      'alter table "task" add constraint "task_category_check" check ("category" in (\'issue\', \'feature\', \'inquiry\'));',
    );
    this.addSql('alter table "task" alter column "category" drop not null;');
    this.addSql(
      'alter table "task" alter column "reproducible" type text using ("reproducible"::text);',
    );
    this.addSql(
      "alter table \"task\" add constraint \"task_reproducible_check\" check (\"reproducible\" in ('always', 'sometimes', 'rarely', 'unable', 'not_applicable'));",
    );
    this.addSql(
      'alter table "task" alter column "reproducible" drop not null;',
    );
    this.addSql(
      'alter table "task" alter column "assigned_to_id" type int using ("assigned_to_id"::int);',
    );
    this.addSql(
      'alter table "task" alter column "assigned_to_id" drop not null;',
    );
    this.addSql('alter table "task" drop column "notification_status";');
    this.addSql('alter table "task" drop column "release";');
    this.addSql(
      'alter table "task" add constraint "task_assigned_to_id_foreign" foreign key ("assigned_to_id") references "user" ("id") on update cascade on delete set null;',
    );
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "task" drop constraint if exists "task_priority_check";',
    );
    this.addSql(
      'alter table "task" drop constraint if exists "task_category_check";',
    );
    this.addSql(
      'alter table "task" drop constraint if exists "task_reproducible_check";',
    );

    this.addSql(
      'alter table "task" drop constraint "task_assigned_to_id_foreign";',
    );

    this.addSql(
      'alter table "task" add column "notification_status" text check ("notification_status" in (\'notified\', \'not_notified\')) not null, add column "release" varchar(255) null;',
    );
    this.addSql(
      'alter table "task" alter column "priority" type text using ("priority"::text);',
    );
    this.addSql(
      "alter table \"task\" add constraint \"task_priority_check\" check (\"priority\" in ('none', 'low', 'normal', 'high', 'critical'));",
    );
    this.addSql('alter table "task" alter column "priority" set not null;');
    this.addSql(
      'alter table "task" alter column "category" type text using ("category"::text);',
    );
    this.addSql(
      'alter table "task" add constraint "task_category_check" check ("category" in (\'issue\', \'feature\', \'inquiry\'));',
    );
    this.addSql('alter table "task" alter column "category" set not null;');
    this.addSql(
      'alter table "task" alter column "reproducible" type text using ("reproducible"::text);',
    );
    this.addSql(
      "alter table \"task\" add constraint \"task_reproducible_check\" check (\"reproducible\" in ('always', 'sometimes', 'rarely', 'unable', 'not_applicable'));",
    );
    this.addSql('alter table "task" alter column "reproducible" set not null;');
    this.addSql(
      'alter table "task" alter column "assigned_to_id" type int using ("assigned_to_id"::int);',
    );
    this.addSql(
      'alter table "task" alter column "assigned_to_id" set not null;',
    );
    this.addSql(
      'alter table "task" add constraint "task_assigned_to_id_foreign" foreign key ("assigned_to_id") references "user" ("id") on update cascade;',
    );
  }
}
