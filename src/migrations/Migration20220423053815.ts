import { Migration } from '@mikro-orm/migrations';

export class Migration20220423053815 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      "alter table \"task\" add column \"reproducible\" text check (\"reproducible\" in ('always', 'sometimes', 'rarely', 'unable', 'not_applicable')) not null;",
    );
  }

  async down(): Promise<void> {
    this.addSql('alter table "task" drop column "reproducible";');
  }
}
