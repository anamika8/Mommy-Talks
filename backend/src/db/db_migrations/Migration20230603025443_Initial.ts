import { Migration } from '@mikro-orm/migrations';

export class Migration20230603025443 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "users" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "deleted_at" timestamptz(0) null, "email" varchar(255) not null, "first_name" varchar(255) not null, "last_name" varchar(255) not null, "uuid" varchar(255) not null, "last_login" timestamptz(0) null, "role" text check ("role" in (\'Admin\', \'User\')) not null);');
    this.addSql('alter table "users" add constraint "users_email_unique" unique ("email");');

    this.addSql('create table "forums" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "deleted_at" timestamptz(0) null, "user_id" int not null, "title" varchar(255) not null, "content" varchar(255) not null);');

    this.addSql('create table "comments" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "deleted_at" timestamptz(0) null, "user_id" int not null, "forum_id_id" int not null, "comment" varchar(255) not null, "deleted" boolean not null);');

    this.addSql('alter table "forums" add constraint "forums_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;');

    this.addSql('alter table "comments" add constraint "comments_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;');
    this.addSql('alter table "comments" add constraint "comments_forum_id_id_foreign" foreign key ("forum_id_id") references "forums" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "forums" drop constraint "forums_user_id_foreign";');

    this.addSql('alter table "comments" drop constraint "comments_user_id_foreign";');

    this.addSql('alter table "comments" drop constraint "comments_forum_id_id_foreign";');

    this.addSql('drop table if exists "users" cascade;');

    this.addSql('drop table if exists "forums" cascade;');

    this.addSql('drop table if exists "comments" cascade;');
  }

}
