import { Migration } from '@mikro-orm/migrations';

export class Migration20220520161747 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "task" alter column "description" type varchar(255) using ("description"::varchar(255));',
    );
    this.addSql('alter table "task" alter column "description" drop not null;');
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "task" alter column "description" type varchar(255) using ("description"::varchar(255));',
    );
    this.addSql('alter table "task" alter column "description" set not null;');
  }
}
