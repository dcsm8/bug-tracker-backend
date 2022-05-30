import { Migration } from '@mikro-orm/migrations';

export class Migration20220530223914 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "user" alter column "full_name" type varchar(255) using ("full_name"::varchar(255));',
    );
    this.addSql('alter table "user" alter column "full_name" set not null;');
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "user" alter column "full_name" type varchar(255) using ("full_name"::varchar(255));',
    );
    this.addSql('alter table "user" alter column "full_name" drop not null;');
  }
}
