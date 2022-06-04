import { Migration } from '@mikro-orm/migrations';

export class Migration20220604174806 extends Migration {
  async up(): Promise<void> {
    this.addSql('alter table "comment" rename column "description" to "text";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "comment" rename column "text" to "description";');
  }
}
