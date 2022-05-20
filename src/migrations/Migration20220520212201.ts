import { Migration } from '@mikro-orm/migrations';

export class Migration20220520212201 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "task" add column "position" int not null default 0;',
    );
  }

  async down(): Promise<void> {
    this.addSql('alter table "task" drop column "position";');
  }
}
