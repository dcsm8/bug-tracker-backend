import { Migration } from '@mikro-orm/migrations';

export class Migration20220518020145 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "task" alter column "release" type varchar(255) using ("release"::varchar(255));');
    this.addSql('alter table "task" alter column "release" drop not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "task" alter column "release" type varchar(255) using ("release"::varchar(255));');
    this.addSql('alter table "task" alter column "release" set not null;');
  }

}
