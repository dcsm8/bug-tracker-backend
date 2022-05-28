import { Migration } from '@mikro-orm/migrations';

export class Migration20220528220137 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "area" alter column "color" type varchar(255) using ("color"::varchar(255));',
    );
    this.addSql('alter table "area" alter column "color" drop not null;');
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "area" alter column "color" type varchar(255) using ("color"::varchar(255));',
    );
    this.addSql('alter table "area" alter column "color" set not null;');
  }
}
