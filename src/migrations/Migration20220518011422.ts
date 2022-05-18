import { Migration } from '@mikro-orm/migrations';

export class Migration20220518011422 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "task" add column "description" varchar(255) not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "task" drop column "description";');
  }

}
