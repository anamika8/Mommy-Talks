import { Migration } from '@mikro-orm/migrations';

export class Migration20230504071923 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "comment" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "the_sender_id" int not null, "comment" varchar(255) not null, "deleted" boolean not null);');

    this.addSql('alter table "comment" add constraint "comment_the_sender_id_foreign" foreign key ("the_sender_id") references "users" ("id") on update cascade;');

    this.addSql('alter table "users" drop column "is_matched";');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "comment" cascade;');

    this.addSql('alter table "users" add column "is_matched" boolean not null default false;');
  }

}
