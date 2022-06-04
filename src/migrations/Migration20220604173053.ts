import { Migration } from '@mikro-orm/migrations';

export class Migration20220604173053 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "comment" ("id" serial primary key, "user_id" int not null, "description" text not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);',
    );

    this.addSql(
      'alter table "comment" add constraint "comment_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;',
    );
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "comment" cascade;');
  }
}
