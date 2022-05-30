import { Migration } from '@mikro-orm/migrations';

export class Migration20220530223754 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" add column "full_name" varchar(255) null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "user" drop column "full_name";');
  }

}
