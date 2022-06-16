import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'post' })
export class PostEntity {
  @PrimaryKey()
  id: number;

  @Property()
  title: string;

  @Property()
  desc: string;

  @Property()
  createdAt?: Date = new Date();

  @Property({ nullable: true, type: 'timestamptz' })
  deletedAt?: Date;
}
