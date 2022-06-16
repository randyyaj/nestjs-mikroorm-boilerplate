import { Migration } from '@mikro-orm/migrations';

export class Migration20220616193115 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "post" ("id" serial primary key, "title" varchar(255) not null, "desc" varchar(255) not null, "created_at" timestamptz(0) not null, "deleted_at" timestamptz(0) null);');
  }

  async down(): Promise<void> {
    this.addSql('drop table post;');
  }

}
