import { MigrationInterface, QueryRunner } from 'typeorm';

export class Users1788379071314 implements MigrationInterface {
  name = 'Users1788379071314';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying(320) NOT NULL, "password_hash" character varying(255) NOT NULL, "username" character varying(255) NOT NULL, "first_name" character varying(255) NOT NULL, "last_name" character varying(255), "avatar" character varying, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE UNIQUE INDEX "IDX_e12875dfb3b1d92d7d7c5377e2" ON "users"  ("email") ',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'DROP INDEX "public"."IDX_e12875dfb3b1d92d7d7c5377e2"',
    );
    await queryRunner.query('DROP TABLE "users"');
  }
}
