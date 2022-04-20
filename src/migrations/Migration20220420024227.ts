import { Migration } from '@mikro-orm/migrations';

export class Migration20220420024227 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "task" ("id" serial primary key, "title" varchar(255) not null, "priority" text check ("priority" in (\'low\', \'normal\', \'high\', \'critical\')) not null, "status" text check ("status" in (\'unassigned\', \'in_progress\', \'testing\', \'complete\', \'fixed\', \'wont_fix\', \'cant_reproduce\')) not null, "notification_status" text check ("notification_status" in (\'notified\', \'not_notified\')) not null, "category" text check ("category" in (\'issue\', \'feature\', \'inquiry\')) not null, "short_description" varchar(255) not null, "long_description" varchar(255) not null, "release" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);',
    );
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "task" cascade;');
  }
}
