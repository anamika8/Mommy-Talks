import { Migration } from '@mikro-orm/migrations';

export class Migration20230517002415 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "forum" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "deleted_at" timestamptz(0) null, "user_id" int not null, "title" varchar(255) not null, "content" varchar(255) not null);');

    this.addSql('alter table "forum" add constraint "forum_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;');

    this.addSql('alter table "message" drop constraint "message_receiver_id_foreign";');
    this.addSql('alter table "message" drop constraint "message_sender_id_foreign";');

    this.addSql('alter table "message" alter column "sender_id" type int using ("sender_id"::int);');
    this.addSql('alter table "message" alter column "sender_id" set not null;');
    this.addSql('alter table "message" alter column "receiver_id" type int using ("receiver_id"::int);');
    this.addSql('alter table "message" alter column "receiver_id" set not null;');
    this.addSql('alter table "message" add constraint "message_receiver_id_foreign" foreign key ("receiver_id") references "users" ("id") on update cascade;');
    this.addSql('alter table "message" add constraint "message_sender_id_foreign" foreign key ("sender_id") references "users" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "forum" cascade;');

    this.addSql('alter table "message" drop constraint "message_sender_id_foreign";');
    this.addSql('alter table "message" drop constraint "message_receiver_id_foreign";');

    this.addSql('alter table "message" alter column "sender_id" type int4 using ("sender_id"::int4);');
    this.addSql('alter table "message" alter column "sender_id" drop not null;');
    this.addSql('alter table "message" alter column "receiver_id" type int4 using ("receiver_id"::int4);');
    this.addSql('alter table "message" alter column "receiver_id" drop not null;');
    this.addSql('alter table "message" add constraint "message_sender_id_foreign" foreign key ("sender_id") references "users" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "message" add constraint "message_receiver_id_foreign" foreign key ("receiver_id") references "users" ("id") on update cascade on delete cascade;');
  }

}
